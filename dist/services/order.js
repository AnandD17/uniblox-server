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
const models_1 = __importDefault(require("../models"));
const cart_1 = __importDefault(require("./cart"));
const discount_1 = __importDefault(require("./discount"));
const createOrder = (cartId) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield models_1.default.cart.findById(cartId).populate('items.item');
    let totalBeforeDiscount = 0;
    let total = 0;
    const orderCount = (yield models_1.default.order.countDocuments({ userId: cart.userId })) || 0;
    const discount = yield discount_1.default.checkNthOrderDiscount(orderCount + 1);
    if (discount) {
        totalBeforeDiscount = cart.items.reduce((acc, item) => acc + item.item.price * item.quantity, 0);
        const discountAmount = totalBeforeDiscount * discount.discount / 100;
        total = totalBeforeDiscount - discountAmount;
    }
    else {
        totalBeforeDiscount = cart.items.reduce((acc, item) => acc + item.item.price * item.quantity, 0);
        total = totalBeforeDiscount;
    }
    const newOrder = yield models_1.default.order.create({
        userId: cart.userId,
        items: cart.items,
        totalBeforeDiscount,
        discount,
        total,
    });
    // empty the cart
    yield cart_1.default.clearCart(cartId);
    return newOrder;
});
const getOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield models_1.default.order.find({ userId }).populate('items.item').populate('discount');
    return orders;
});
const orderService = {
    createOrder,
    getOrders
};
exports.default = orderService;
//# sourceMappingURL=order.js.map