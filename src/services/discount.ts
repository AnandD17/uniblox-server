import db from "../models";
import { TDiscount } from "../types";

const getDiscount = async (code: string) => {
    const discount = await db.discount.findOne({ code, isActive: true });
    return discount;
};

const checkNthOrderDiscount = async ( nthOrder: number) => {
    const discounts = await db.discount.findOne({ nthOrder, isActive: true });
    return discounts;
};

const createDiscount = async (discount: TDiscount) => {
    const newDiscount = await db.discount.create(discount);
    return newDiscount;
};

const discountService = {
    getDiscount,
    checkNthOrderDiscount,
    createDiscount
}

export default discountService;