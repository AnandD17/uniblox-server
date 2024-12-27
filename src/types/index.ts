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
