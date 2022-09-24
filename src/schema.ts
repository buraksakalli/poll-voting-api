import { model, Schema } from "mongoose";

export interface IUser {
  fullname: string;
  email: string;
  password: string;
  username: string;
  token: string;
}

export interface IPoll {
  title: string;
  options: string[];
  expiry_date: Date;
  user_id: string;
  slug: string;
}

export interface IEntry {
  poll_id: string;
  option: string;
  user_id: string;
}

export const entrySchema = new Schema({
  poll_id: { type: String, required: true },
  option: { type: String, required: true },
  user_id: { type: String, required: true },
});

export const pollSchema = new Schema<IPoll>({
  title: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  expiry_date: {
    type: Date,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
});

export const userSchema = new Schema<IUser>({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

export const Entry = model("Entry", entrySchema);
export const Poll = model<IPoll>("Poll", pollSchema);
export const User = model<IUser>("User", userSchema);
