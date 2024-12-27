"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const models_1 = __importDefault(require("../models"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUser = (body) => __awaiter(void 0, void 0, void 0, function* () {
    if (!body) {
        throw new ApiError_1.default(400, 'Please provide all the required fields');
    }
    const { name, email, password } = body;
    const existingUser = yield models_1.default.user.findOne({ email });
    if (existingUser) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User already exists');
    }
    const user = yield models_1.default.user.create({ name, email, password });
    return user;
});
const updateUser = (userId, body) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = body;
    const user = yield models_1.default.user.findByIdAndUpdate(userId, { name, email, password }, { new: true });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    return user;
});
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.default.user.findById(userId);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    return user;
});
const loginUser = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = body;
    const user = yield models_1.default.user.findOne({ email, password });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    return user;
});
const createJWT = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    return token;
});
const userService = {
    createUser,
    updateUser,
    getUserById,
    loginUser,
    createJWT
};
exports.default = userService;
//# sourceMappingURL=user.js.map