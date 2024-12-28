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
exports.getDiscount = exports.createDiscount = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const discount_1 = __importDefault(require("../services/discount"));
const models_1 = __importDefault(require("../models"));
exports.createDiscount = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const discount = yield discount_1.default.createDiscount(req.body);
    res.status(200).json({ discount });
}));
exports.getDiscount = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const orderCount = yield models_1.default.order.countDocuments({ userId: req.user._id });
    const discount = yield discount_1.default.checkNthOrderDiscount(orderCount + 1);
    res.status(200).json({ discount });
}));
//# sourceMappingURL=discount.js.map