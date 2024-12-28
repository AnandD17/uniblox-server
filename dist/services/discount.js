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
const getDiscount = (code) => __awaiter(void 0, void 0, void 0, function* () {
    const discount = yield models_1.default.discount.findOne({ code, isActive: true });
    return discount;
});
const checkNthOrderDiscount = (nthOrder) => __awaiter(void 0, void 0, void 0, function* () {
    const discounts = yield models_1.default.discount.findOne({ nthOrder, isActive: true });
    return discounts;
});
const createDiscount = (discount) => __awaiter(void 0, void 0, void 0, function* () {
    const newDiscount = yield models_1.default.discount.create(discount);
    return newDiscount;
});
const discountService = {
    getDiscount,
    checkNthOrderDiscount,
    createDiscount
};
exports.default = discountService;
//# sourceMappingURL=discount.js.map