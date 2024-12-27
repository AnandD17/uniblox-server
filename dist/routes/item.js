"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const items_1 = require("../controllers/items");
const isLoggedIn_1 = require("../middleware/isLoggedIn");
const router = express_1.default.Router();
router.get('/', items_1.getItems);
router.get('/:id', items_1.getItemById);
router.post('/seed', isLoggedIn_1.isLoggedIn, isLoggedIn_1.isAdmin, items_1.seedItems);
exports.default = router;
//# sourceMappingURL=item.js.map