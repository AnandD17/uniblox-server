import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import userService from "../services/user";

export const isLoggedIn = async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token);
    if (!token) {
        return next(new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized'));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || typeof decoded === 'string') {
        return next(new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized'));
    }
    const user = await userService.getUserById(decoded.userId as string);
    if (!user) {
        return next(new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized'));
    }
    req.user = user;
    next();
};

export const isAdmin = async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    // Call isLoggedIn and return if it encounters an error
    await isLoggedIn(req, res, (err) => {
        if (err) {
            return next(err); // Stop execution if an error occurs
        }

        // Continue if user is logged in
        if (req.user?.role !== 'admin') {
            return next(new ApiError(httpStatus.FORBIDDEN, 'Restricted to admins only'));
        }
        
        next(); // User is admin, continue to the next middleware
    });
};
