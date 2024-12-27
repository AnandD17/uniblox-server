import httpStatus from "http-status";
import db from "../models";
import { TItem } from "../types";
import ApiError from "../utils/ApiError";

const createItem = async (item: TItem) => {
    const newItem = await db.item.create(item);
    return newItem;
};

const createManyItems = async (items: TItem[]) => {
    const newItems = await db.item.insertMany(items);
    return newItems;
};

const getItems = async () => {
    const items = await db.item.find({});
    return items;
};

const getItemById = async (id: string) => {
    const item = await db.item.findById(id);
    if (!item) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
    }
    return item;
};

const itemService = {
    createItem,
    getItems,
    getItemById,
    createManyItems
};

export default itemService;