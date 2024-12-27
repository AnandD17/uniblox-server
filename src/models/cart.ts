import mongoose, { Schema, Document } from 'mongoose';
import { TCart } from '../types';

export interface ICart extends Document, TCart {}

const cartSchema: Schema = new Schema({
  userId: { type: String, required: true, ref: 'User', unique: true },
  items: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
      quantity: { type: Number, default: 1 }
    }
  ]
}, { timestamps: true });

export default mongoose.model<ICart>('Cart', cartSchema);
