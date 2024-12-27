import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import orderService from "../services/order";
import cartService from "../services/cart";
import { ICart } from "../models/cart";

export const createOrder = catchAsync(async (req: Request & {user: {_id:string}}, res: Response, next: NextFunction) => {
    const userId = req.user._id;
    const cart:ICart  = await cartService.getCart(userId);
    if(!cart) throw new Error('Cart not found');
    if(cart.items.length === 0) throw new Error('Cart is empty');
    const order = await orderService.createOrder(String(cart._id));
    res.status(200).json({ order });
});

export const getOrders = catchAsync(async (req: Request & {user: {_id:string}}, res: Response, next: NextFunction) => {
    const userId = req.user._id;
    const orders = await orderService.getOrders(userId);
    res.status(200).json({ orders });
});