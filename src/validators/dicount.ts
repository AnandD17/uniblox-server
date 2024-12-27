import Joi from "joi";

export const createDiscountValidator = {
    body: Joi.object().keys({
        code: Joi.string().required(),
        description: Joi.string().required(),
        discount: Joi.number().required(),
        nthOrder: Joi.number().min(1).required(),
    })
};