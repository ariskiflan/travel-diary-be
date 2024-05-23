import db from "../db";
import { registerValidator } from "../lib/validation/register";
import { Iregister } from "../type/app";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async () => {
  return await db.user.findMany();
};

export const getUser = async (id: number) => {
  return await db.user.findFirst({
    where: {
      id,
    },
  });
};

export const register = async (payload: Iregister) => {
  const { error, value } = registerValidator.validate(payload);
  if (error) throw new Error(error.details[0].message);

  const isExist = await db.user.findFirst({
    where: {
      OR: [
        {
          fullname: value.fullname,
        },
        {
          email: value.email,
        },
      ],
    },
  });

  if (isExist) throw new Error("Username or Email already exist");

  const hasPassword = await bcrypt.hash(value.password, 10);
  value.password = hasPassword;

  const user = await db.user.create({
    data: {
      ...value,
    },
  });

  return user;
};

export const login = async (
  fullname: string,
  password: string
): Promise<string> => {
  const user = await db.user.findFirst({
    where: {
      OR: [
        {
          fullname,
        },
        {
          email: fullname,
        },
      ],
    },
  });

  if (!user) throw new Error("Email or Password is not valid");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error("Email or Password is not valid");

  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "1D",
    }
  );

  return token;
};
