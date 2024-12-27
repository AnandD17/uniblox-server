import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import httpStatus from 'http-status';
import userService from '../services/user';
import { TUserWithId } from '../types';

export const createUser = catchAsync(async (req:Request, res:Response) => {
    const user = await userService.createUser(req.body);
    res.status(httpStatus.CREATED).json({ user });
});

export const updateMe = catchAsync(async (req:Request & { user: TUserWithId }, res:Response) => {
    const user = await userService.updateUser(req.user._id, req.body);
    res.status(httpStatus.OK).json({ user });
});

export const loginUser = catchAsync(async (req:Request, res:Response) => {
    const user = await userService.loginUser(req.body);
    const token = await userService.createJWT(user);
    res.status(httpStatus.OK).json({ user, token });
});

export const getMe = catchAsync(async (req:Request & { user: TUserWithId }, res:Response) => {
    const user = await userService.getUserById(req.user._id);
    res.status(httpStatus.OK).json({ user });
});