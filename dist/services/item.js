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
const http_status_1 = __importDefault(require("http-status"));
const models_1 = __importDefault(require("../models"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const createItem = (item) => __awaiter(void 0, void 0, void 0, function* () {
    const newItem = yield models_1.default.item.create(item);
    return newItem;
});
const createManyItems = (items) => __awaiter(void 0, void 0, void 0, function* () {
    const newItems = yield models_1.default.item.insertMany(items);
    return newItems;
});
const getItems = () => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield models_1.default.item.find({});
    return items;
});
const getItemById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const item = yield models_1.default.item.findById(id);
    if (!item) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Item not found');
    }
    return item;
});
const itemService = {
    createItem,
    getItems,
    getItemById,
    createManyItems
};
exports.default = itemService;
//# sourceMappingURL=item.js.map