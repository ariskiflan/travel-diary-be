import { Request, Response } from "express";
import * as userServices from "../services/userService";

export const register = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const result = await userServices.register(body);

    res.json({
      status: true,
      message: "success",
    });
  } catch (error) {
    const err = error as unknown as Error;
    // console.log(err);

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { fullname, password } = req.body;

    const token = await userServices.login(fullname, password);

    res.json({
      status: true,
      message: "success",
      data: token,
    });
  } catch (error) {
    const err = error as unknown as Error;

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userServices.getUsers();

    res.json({
      status: true,
      message: "success",
      data: users,
    });
  } catch (error) {
    const err = error as unknown as Error;

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userServices.getUser(+id);
    res.json({
      status: true,
      message: "success",
      data: user,
    });
  } catch (error) {
    const err = error as unknown as Error;

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};
