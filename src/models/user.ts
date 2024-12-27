
import mongoose, { Schema, Document } from 'mongoose';
import { TUser } from '../types';

export interface IUser extends Document, TUser {}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
}, { timestamps: true });

export default mongoose.model<IUser>('User', userSchema);
