import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface IRequest extends Request {
  user:
    | {
        _id: string;
        fullname: 'string';
      }
    | JwtPayload
    | string;
  token: string;
}

export function auth(req: IRequest, res: Response, next: NextFunction) {
  const bearerHeader = req.header('Authorization');
  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
  }

  if (!req.token) return res.status(400).json({ message: 'Access Denied', auth: false });

  try {
    const verified = jwt.verify(req.token, process.env['TOKEN_SECRET'] as string);
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized', auth: false });
  }
}
