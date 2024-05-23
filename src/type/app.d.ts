export interface Iregister {
  phone: string;
  fullname: string;
  email: string;
  password: string;
}

export type authMidlleware = {
  id: string;
};

export interface IArticle {
  id?: number;
  title?: string;
  content?: string;
  userId: number;
  image: string;
}
