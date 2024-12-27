"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_1 = require("../controllers/cart");
const isLoggedIn_1 = require("../middleware/isLoggedIn");
const cart_2 = require("../validators/cart");
const validate_1 = __importDefault(require("../middleware/validate"));
const router = express_1.default.Router();
router.get('/', isLoggedIn_1.isLoggedIn, cart_1.getCart);
router.post('/:id', isLoggedIn_1.isLoggedIn, (0, validate_1.default)(cart_2.addItemToCartValidator), cart_1.addItemToCart);
router.put('/:id', isLoggedIn_1.isLoggedIn, (0, validate_1.default)(cart_2.updateItemQuantityValidator), cart_1.updateItemQuantity);
exports.default = router;
//# sourceMappingURL=cart.js.map