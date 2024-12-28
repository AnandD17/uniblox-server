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
exports.isAdmin = exports.isLoggedIn = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../services/user"));
const isLoggedIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    console.log(token);
    if (!token) {
        return next(new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized'));
    }
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    if (!decoded || typeof decoded === 'string') {
        return next(new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized'));
    }
    const user = yield user_1.default.getUserById(decoded.userId);
    if (!user) {
        return next(new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized'));
    }
    req.user = user;
    next();
});
exports.isLoggedIn = isLoggedIn;
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Call isLoggedIn and return if it encounters an error
    yield (0, exports.isLoggedIn)(req, res, (err) => {
        var _a;
        if (err) {
            return next(err); // Stop execution if an error occurs
        }
        // Continue if user is logged in
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== 'admin') {
            return next(new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Restricted to admins only'));
        }
        next(); // User is admin, continue to the next middleware
    });
});
exports.isAdmin = isAdmin;
//# sourceMappingURL=isLoggedIn.js.map