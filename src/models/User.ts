import { model, Schema } from 'mongoose';

export interface IUser {
  _id: string;
  fullname: string;
  email: string;
  password: string;
  username: string;
  token: string;
}

export const userSchema = new Schema<IUser>({
  fullname: {
    type: String,
    required: true,
    min: 4,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
    // select: false,
  },
  username: {
    type: String,
    required: true,
    min: 4,
    max: 255,
  },
});

export const User = model<IUser>('User', userSchema);
