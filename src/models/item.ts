
import mongoose, { Schema, Document } from 'mongoose';
import { TItem } from '../types';

export interface IItem extends Document, TItem {}

const itemSchema: Schema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String },
  image: { type: String },
  rating: {
    rate: { type: Number },
    count: { type: Number }
  }
}, { timestamps: true });

export default mongoose.model<IItem>('Item', itemSchema);
