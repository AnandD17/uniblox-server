import httpStatus from "http-status";
import db from "../models";
import { IUser } from "../models/user";
import ApiError from "../utils/ApiError";
import jwt from "jsonwebtoken";

const createUser = async (body: IUser) => {
    if (!body) {
        throw new ApiError(400, 'Please provide all the required fields');
    }
    const { name, email, password } = body;
    const existingUser = await db.user.findOne({ email });
    if (existingUser) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'User already exists');
    }
    const user = await db.user.create({ name, email, password });
    return user;
};

const updateUser = async (userId: string, body: Partial<IUser>) => {
    const { name, email, password } = body;
    const user = await db.user.findByIdAndUpdate(userId, { name, email, password }, { new: true });
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    return user;
};

const getUserById = async (userId: string) => {
    const user = await db.user.findById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    return user;
};

const loginUser = async (body: IUser) => {
    const { email, password } = body;
    const user = await db.user.findOne({ email, password });
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    return user;
};

const createJWT = async (user: IUser) => {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    return token;
};

const userService = {
    createUser,
    updateUser,
    getUserById,
    loginUser,
    createJWT
};

export default userService;
