import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import cartService from "../services/cart";
import httpStatus from "http-status";

export const addItemToCart = catchAsync(async (req: Request & { user: { id: string } }, res: Response, next: NextFunction) => {
    const cart = await cartService.addItemToCart(req.user?.id, req.params.id);
    res.status(httpStatus.CREATED).json(cart);
});

export const updateItemQuantity = catchAsync(async (req: Request & { user: { id: string } }, res: Response, next: NextFunction) => {
    const cart = await cartService.updateItemQuantity(req.user?.id, req.params.id, req.body.quantity);
    res.status(httpStatus.OK).json(cart);
});

export const getCart = catchAsync(async (req: Request & { user: { id: string } }, res: Response, next: NextFunction) => {
    const cart = await cartService.getCart(req.user?.id);
    res.status(httpStatus.OK).json(cart);
});