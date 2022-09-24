import { model, Schema } from 'mongoose';

export interface IEntry {
  poll_id: string;
  option: string;
  user_id: string;
}

export const entrySchema = new Schema<IEntry>({
  poll_id: { type: String, required: true, min: 12 },
  option: { type: String, required: true, min: 1, max: 512 },
  user_id: { type: String, required: true, min: 12 },
});

export const Entry = model('Entry', entrySchema);
