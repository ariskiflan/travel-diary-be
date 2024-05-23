import { Request, Response } from "express";
import * as BookmarkServices from "../services/bookmarkService";

export const createBookmark = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user;
    const articleId = req.body.articleId;

    // console.log(userId, "ini userId");
    // console.log(journeyId, "ini journeyId");

    const result = await BookmarkServices.createBookmark({ userId, articleId });
    res.json({
      status: true,
      message: "success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error,
    });
  }
};

export const getAllBookmark = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user;

    const result = await BookmarkServices.getAllBookmark(userId);

    res.json({
      status: true,
      message: "success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error,
    });
  }
};

export const getCurrentBookmark = async (req: Request, res: Response) => {
  try {
    const { articleId } = req.params;
    const userId = res.locals.user;
    const bookmark = await BookmarkServices.getCurrentBookmark(
      +articleId,
      +userId
    );

    res.json({
      status: true,
      message: "success",
      data: {
        bookmark,
      },
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
