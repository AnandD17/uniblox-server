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
const addItemToCart = (userId, itemId) => __awaiter(void 0, void 0, void 0, function* () {
    const item = yield models_1.default.item.findById(itemId);
    if (!item) {
        throw new Error('Item not found');
    }
    const checkCart = yield models_1.default.cart.findOne({ userId }).lean();
    if (!checkCart) {
        const cart = yield models_1.default.cart.create({ userId, items: [{ item: itemId, quantity: 1 }] });
        return cart;
    }
    const checkItem = checkCart.items.find((item) => String(item.item) == String(itemId));
    if (checkItem) {
        return checkCart;
    }
    const cart = yield models_1.default.cart.findOneAndUpdate({ userId }, { $addToSet: { items: { item: itemId, quantity: 1 } } }, { new: true });
    return cart;
});
const updateItemQuantity = (userId, itemId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    if (quantity <= 0) {
        const cart = yield models_1.default.cart.findOneAndUpdate({ userId, 'items.item': itemId }, { $pull: { items: { item: itemId } } }, { new: true });
        return cart;
    }
    const cart = yield models_1.default.cart.findOneAndUpdate({ userId, 'items.item': itemId }, { $set: { 'items.$.quantity': quantity } }, { new: true });
    return cart;
});
const getCart = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield models_1.default.cart.findOne({ userId }).populate('items.item');
    return cart;
});
const clearCart = (cartId) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield models_1.default.cart.findOneAndUpdate({ _id: cartId }, { $set: { items: [] } }, { new: true });
    return cart;
});
const cartService = {
    addItemToCart,
    updateItemQuantity,
    getCart,
    clearCart
};
exports.default = cartService;
//# sourceMappingURL=cart.js.map