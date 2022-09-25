import { model, Schema } from 'mongoose';

export interface IPoll {
  title: string;
  options: string[];
  expiry_date: Date;
  user_id: string;
  slug: string;
  created_at: Date;
}

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
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export const Poll = model<IPoll>('Poll', pollSchema);
