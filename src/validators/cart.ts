import Joi from "joi";

export const addItemToCartValidator = {
    params: Joi.object().keys({
      id: Joi.string().required(),
    }),
};

export const updateItemQuantityValidator = {
    params: Joi.object().keys({
      id: Joi.string().required(),
    }),
    body: Joi.object().keys({
      quantity: Joi.number().required(),
    }),
};