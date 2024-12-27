import mongoose from "mongoose";

export type TNotes = {
  title: string;
  description: string;
  userId: string;
  color: string;
};

export type TUser = {
  name: string;
  email: string;
  password: string;
  isActive: boolean;
};

export type TUserWithId = TUser & {
  _id: string;
};

export type TItem = {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type TItemWithId = TItem & {
  _id: string;
};

export type TCart = {
  userId: string;
  items: {
    item: mongoose.Types.ObjectId;
    quantity: number;
  }[];
};

export type TCartWithId = TCart & {
  _id: string;
};