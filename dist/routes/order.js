"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_1 = require("../controllers/order");
const isLoggedIn_1 = require("../middleware/isLoggedIn");
const router = express_1.default.Router();
router.post('/', isLoggedIn_1.isLoggedIn, order_1.createOrder);
router.get('/', isLoggedIn_1.isLoggedIn, order_1.getOrders);
exports.default = router;
//# sourceMappingURL=order.js.map