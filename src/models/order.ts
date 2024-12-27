import mongoose, { Schema, Document } from 'mongoose';
import { TOrder } from '../types';

export interface IOrder extends Document, TOrder {}

const orderSchema: Schema = new Schema({
  userId: { type: String, required: true, ref: 'User' },
  items: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
      quantity: { type: Number, default: 1 }
    }
  ],
  totalBeforeDiscount: { type: Number, required: true },
  discount: { type: mongoose.Schema.Types.ObjectId, ref: 'Discount' },
  total: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model<IOrder>('Order', orderSchema);
