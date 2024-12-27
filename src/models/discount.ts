import mongoose, { Schema, Document } from 'mongoose';
import { TDiscount } from '../types';

export interface IDiscount extends Document, TDiscount {}

const discountSchema: Schema = new Schema({
  code: { type: String, required: true },
  description: { type: String },
  discount: { type: Number, required: true },
  nthOrder: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model<IDiscount>('Discount', discountSchema);
    