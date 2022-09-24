import Joi from 'joi';

export const userValidationSchema = Joi.object({
  fullname: Joi.string().min(4).max(255).required(),
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
  username: Joi.string().min(4).max(255).required(),
});
