import Joi from "joi";

export const createUserValidator = {
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
};

export const loginUserValidator = {
    body: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
};

export const updateMeValidator = {
    body: Joi.object().keys({
      name: Joi.string().optional(),
      email: Joi.string().optional(),
      password: Joi.string().optional(),
    }),
};