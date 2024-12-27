"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMeValidator = exports.loginUserValidator = exports.createUserValidator = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createUserValidator = {
    body: joi_1.default.object().keys({
        name: joi_1.default.string().required(),
        email: joi_1.default.string().required(),
        password: joi_1.default.string().required(),
    }),
};
exports.loginUserValidator = {
    body: joi_1.default.object().keys({
        email: joi_1.default.string().required(),
        password: joi_1.default.string().required(),
    }),
};
exports.updateMeValidator = {
    body: joi_1.default.object().keys({
        name: joi_1.default.string().optional(),
        email: joi_1.default.string().optional(),
        password: joi_1.default.string().optional(),
    }),
};
//# sourceMappingURL=user.js.map