"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./user"));
const item_1 = __importDefault(require("./item"));
const cart_1 = __importDefault(require("./cart"));
const discount_1 = __importDefault(require("./discount"));
const order_1 = __importDefault(require("./order"));
const router = express_1.default.Router();
router.use('/user', user_1.default);
router.use('/items', item_1.default);
router.use('/cart', cart_1.default);
router.use('/discount', discount_1.default);
router.use('/order', order_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map