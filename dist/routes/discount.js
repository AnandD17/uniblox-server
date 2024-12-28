"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const discount_1 = require("../controllers/discount");
const isLoggedIn_1 = require("../middleware/isLoggedIn");
const validate_1 = __importDefault(require("../middleware/validate"));
const dicount_1 = require("../validators/dicount");
const router = express_1.default.Router();
router.post('/', isLoggedIn_1.isAdmin, (0, validate_1.default)(dicount_1.createDiscountValidator), discount_1.createDiscount);
router.get('/', isLoggedIn_1.isLoggedIn, discount_1.getDiscount);
exports.default = router;
//# sourceMappingURL=discount.js.map