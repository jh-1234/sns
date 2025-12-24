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
  seq: number;
  name: string;
  userId: string;
  tel: string;
  email?: string;
  birthday?: Date;
  gender: string;
  profileUrl?: string;
  uuid: string;
};

export type User = {
  seq: number;
  name: string;
  userId: string;
  tel: string;
  email?: string;
  birthday?: Date;
  gender: string;
  profileUrl?: string;
  uuid: string;
};

export type UserInfo = {
  name?: string;
  password?: string;
  tel?: string;
  email?: string;
  birthday?: Date;
  gender?: string;
};
