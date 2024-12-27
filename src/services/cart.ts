import mongoose from "mongoose";
import db from "../models";

const addItemToCart = async (userId: string, itemId: string) => {
    const item = await db.item.findById(itemId);
    if(!item) {
        throw new Error('Item not found');
    }
    const checkCart = await db.cart.findOne({ userId }).lean();
    if(!checkCart) {
        const cart = await db.cart.create({ userId, items: [{ item:itemId, quantity: 1 }] });
        return cart;
    }
    const checkItem = checkCart.items.find((item: any) => String(item.item) == String(itemId));
    if(checkItem) {
        return checkCart;
    }
    const cart = await db.cart.findOneAndUpdate({ userId }, { $addToSet: { items: { item:itemId, quantity: 1 } } }, { new: true });
    return cart;
};

const updateItemQuantity = async (userId: string, itemId: string, quantity: number) => {
    if(quantity <= 0) {
        const cart = await db.cart.findOneAndUpdate(
            { userId, 'items.item': itemId },
            { $pull: { items: { item:itemId } } },
            { new: true }
        );
        return cart;
    }
    const cart = await db.cart.findOneAndUpdate(
        { userId, 'items.item': itemId },
        { $set: { 'items.$.quantity': quantity } },
        { new: true }
    );
    return cart;
};

const getCart = async (userId: string) => {
    const cart = await db.cart.findOne({ userId }).populate('items.item');
    return cart;
};

const cartService = {
    addItemToCart,
    updateItemQuantity,
    getCart
};

export default cartService;