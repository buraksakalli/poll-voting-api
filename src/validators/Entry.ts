import Joi from 'joi';

export const entryValidationSchema = Joi.object({
  poll_id: Joi.string().min(12).required(),
  option: Joi.string().min(1).max(512).required(),
  user_id: Joi.string().min(12).required(),
});
