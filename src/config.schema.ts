import Joi from 'joi';

export const configValidationSchema = Joi.object({
  STAGE: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  DB_URL: Joi.string().required(),
});
