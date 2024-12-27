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
exports.getCart = exports.updateItemQuantity = exports.addItemToCart = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const cart_1 = __importDefault(require("../services/cart"));
const http_status_1 = __importDefault(require("http-status"));
exports.addItemToCart = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const cart = yield cart_1.default.addItemToCart((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, req.params.id);
    res.status(http_status_1.default.CREATED).json(cart);
}));
exports.updateItemQuantity = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const cart = yield cart_1.default.updateItemQuantity((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, req.params.id, req.body.quantity);
    res.status(http_status_1.default.OK).json(cart);
}));
exports.getCart = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const cart = yield cart_1.default.getCart((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
    res.status(http_status_1.default.OK).json(cart);
}));
//# sourceMappingURL=cart.js.map