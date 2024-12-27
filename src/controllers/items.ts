import { NextFunction, Request, Response} from "express";
import {dummyItems} from "../data/items";
import db from "../models";
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import itemService from "../services/item";

export const seedItems = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const items = await itemService.createManyItems(dummyItems);
    res.status(httpStatus.CREATED).json({success: true});
});

export const getItems = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const items = await itemService.getItems();
    res.status(httpStatus.OK).json(items);
});

export const getItemById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const item = await itemService.getItemById(req.params.id);
    res.status(httpStatus.OK).json(item);
});