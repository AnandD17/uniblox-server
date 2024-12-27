import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import discountService from "../services/discount";
import cartService from "../services/cart";
import orderService from "../services/order";
import db from "../models";

export const createDiscount = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const discount = await discountService.createDiscount(req.body);
    res.status(200).json({ discount });
});

export const getDiscount = catchAsync(async (req: Request & {user: {_id:string}}, res: Response, next: NextFunction) => {
    const orderCount = await db.order.countDocuments({ userId: req.user._id });
    const discount = await discountService.checkNthOrderDiscount(orderCount+1);
    res.status(200).json({ discount });
});