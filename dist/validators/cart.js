"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItemQuantityValidator = exports.addItemToCartValidator = void 0;
const joi_1 = __importDefault(require("joi"));
exports.addItemToCartValidator = {
    params: joi_1.default.object().keys({
        id: joi_1.default.string().required(),
    }),
};
exports.updateItemQuantityValidator = {
    params: joi_1.default.object().keys({
        id: joi_1.default.string().required(),
    }),
    body: joi_1.default.object().keys({
        quantity: joi_1.default.number().required(),
    }),
};
//# sourceMappingURL=cart.js.map