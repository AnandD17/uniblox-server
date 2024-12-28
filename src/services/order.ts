import db from "../models";
import { ICart } from "../models/cart";
import { IOrder } from "../models/order";
import { TDiscount, TItem, TOrder } from "../types";
import cartService from "./cart";
import discountService from "./discount";

const createOrder = async (cartId: string) => {
    const cart = await db.cart.findById(cartId).populate('items.item') as ICart & {
        items: {item: TItem, quantity: number}[]
    };
    let totalBeforeDiscount = 0;
    let total = 0;
    const orderCount = await db.order.countDocuments({userId: cart.userId}) || 0;
    const discount = await discountService.checkNthOrderDiscount(orderCount+1);
    if(discount) {
        totalBeforeDiscount = cart.items.reduce((acc, item: {item: TItem, quantity: number}) => acc + item.item.price * item.quantity, 0);
        const discountAmount = totalBeforeDiscount * discount.discount / 100;
        total = totalBeforeDiscount - discountAmount;
    } else {
        totalBeforeDiscount = cart.items.reduce((acc, item: {item: TItem, quantity: number}) => acc + item.item.price * item.quantity, 0);
        total = totalBeforeDiscount;
    }
    const newOrder = await db.order.create({
        userId: cart.userId,
        items: cart.items,
        totalBeforeDiscount,
        discount,
        discountId: discount?._id,
        total,
    });
    // empty the cart
    await cartService.clearCart(cartId);
    return newOrder;
};

const getOrders = async (userId: string) => {
    const orders = await db.order.find({ userId }).populate('items.item').populate('discount');
    return orders;
};

const getOrderSummary = async () => {
    const orders = await db.order.find({  }).populate('discount') as (IOrder & {discount: TDiscount})[];
    
    // Calculate total items purchased
    const itemCount = orders.reduce((acc, order) => {
        return acc + order.items.reduce((itemAcc, item) => itemAcc + item.quantity, 0);
    }, 0);

    // Calculate total purchase amount
    const totalPurchaseAmount = orders.reduce((acc, order) => acc + order.total, 0);

    // Get list of discount codes used
    const discountCodes = orders
        .filter(order => order.discount)
        .map(order => ({
            code: order.discount.code,
            amount: order.totalBeforeDiscount - order.total,
            itemsCount: order.items.reduce((acc, item) => acc + item.quantity, 0),
        }));

    // Calculate total discount amount
    const totalDiscountAmount = orders.reduce((acc, order) => {
        return acc + (order.totalBeforeDiscount - order.total);
    }, 0);

    return {
        itemCount,
        totalPurchaseAmount,
        discountCodes,
        totalDiscountAmount
    };
};


export default {
    createOrder,
    getOrders,
    getOrderSummary
}