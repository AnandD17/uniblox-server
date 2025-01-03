"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./user"));
const item_1 = __importDefault(require("./item"));
const cart_1 = __importDefault(require("./cart"));
const discount_1 = __importDefault(require("./discount"));
const order_1 = __importDefault(require("./order"));
const db = {
    user: user_1.default,
    item: item_1.default,
    cart: cart_1.default,
    discount: discount_1.default,
    order: order_1.default
};
exports.default = db;
//# sourceMappingURL=index.js.map