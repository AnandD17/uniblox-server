import db from "../models";
import { ICart } from "../models/cart";
import { TItem } from "../types";
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

const orderService = {
    createOrder,
    getOrders
}

export default orderService;