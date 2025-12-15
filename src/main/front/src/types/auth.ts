export type Join = {
  name: string;
  userId: string;
  password: string;
  tel: string;
  email?: string;
  birthday?: Date;
  gender: string;
};

export type Login = {
  username: string;
  password: string;
};

export type Session = {
  name: string;
  userId: string;
  tel: string;
  email?: string;
  birthday?: Date;
  gender: string;
};
