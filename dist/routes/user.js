"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../validators/user");
const validate_1 = __importDefault(require("../middleware/validate"));
const user_2 = require("../controllers/user");
const isLoggedIn_1 = require("../middleware/isLoggedIn");
const router = express_1.default.Router();
router.post('/', (0, validate_1.default)(user_1.createUserValidator), user_2.createUser);
router.put('/', isLoggedIn_1.isLoggedIn, (0, validate_1.default)(user_1.updateMeValidator), user_2.updateMe);
router.post('/login', (0, validate_1.default)(user_1.loginUserValidator), user_2.loginUser);
router.get('/me', isLoggedIn_1.isLoggedIn, user_2.getMe);
exports.default = router;
//# sourceMappingURL=user.js.map