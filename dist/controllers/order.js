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
exports.getOrders = exports.createOrder = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const order_1 = __importDefault(require("../services/order"));
const cart_1 = __importDefault(require("../services/cart"));
exports.createOrder = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    const cart = yield cart_1.default.getCart(userId);
    if (!cart)
        throw new Error('Cart not found');
    if (cart.items.length === 0)
        throw new Error('Cart is empty');
    const order = yield order_1.default.createOrder(String(cart._id));
    res.status(200).json({ order });
}));
exports.getOrders = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    const orders = yield order_1.default.getOrders(userId);
    res.status(200).json({ orders });
}));
//# sourceMappingURL=order.js.map