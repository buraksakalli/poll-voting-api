import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import Validators, { IValidatorType } from '../validators/index';

export const validator = (validator: IValidatorType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = await Validators[validator].validateAsync(req.body);
      req.body = validated;
      next();
    } catch (err: any) {
      if (err.isJoi) return next(createHttpError(422, { message: err.message }));
      next(createHttpError(500));
    }
  };
};
