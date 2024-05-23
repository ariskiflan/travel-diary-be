import { Request, Response } from "express";
import * as articleService from "../services/articleService";

export const getArticles = async (req: Request, res: Response) => {
  try {
    const articles = await articleService.getArticles();

    res.json({
      status: true,
      message: "success",
      data: articles,
    });
  } catch (error) {
    const err = error as unknown as Error;

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const getArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const article = await articleService.getArticle(+id);
    res.json({
      status: true,
      message: "success",
      data: article,
    });
  } catch (error) {
    const err = error as unknown as Error;
    console.log(err);

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const createArticle = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    body.userId = res.locals.user;
    body.image = req.file?.filename;

    const article = await articleService.createArticle(body);

    res.json({
      status: true,
      message: "success",
      data: article,
    });
  } catch (error) {
    const err = error as unknown as Error;

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};
