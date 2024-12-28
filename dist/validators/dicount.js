"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDiscountValidator = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createDiscountValidator = {
    body: joi_1.default.object().keys({
        code: joi_1.default.string().required(),
        description: joi_1.default.string().required(),
        discount: joi_1.default.number().required(),
        nthOrder: joi_1.default.number().min(1).required(),
    })
};
//# sourceMappingURL=dicount.js.map