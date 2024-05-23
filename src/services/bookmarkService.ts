import db from "../db";

export const createBookmark = async (payload: {
  userId: number;
  articleId: number;
}) => {
  const isExists = await db.article.findFirst({
    where: {
      id: payload.articleId,
    },
  });

  //   console.log(isExists, "ini isExists");

  if (!isExists) {
    throw new Error("Article not found");
  }

  const bookmark = await db.bookmark.findFirst({
    where: {
      userId: payload.userId,
      articleId: payload.articleId,
    },
  });

  //   console.log(bookmark, "ini bookmark");

  if (bookmark) {
    await db.bookmark.deleteMany({
      where: {
        userId: payload.userId,
        articleId: payload.articleId,
      },
    });

    // console.log("bookmark deleted", "ini bookmark deleted");
    // ("bookmark deleted");

    return "bookmark deleted";
  }

  await db.bookmark.create({
    data: {
      ...payload,
    },
  });

  return "bookmark created";
};

export const getAllBookmark = async (userId: number) => {
  const bookmark = await db.bookmark.findMany({
    where: {
      userId,
    },
  });
  return bookmark;
};

export const getCurrentBookmark = async (articleId: number, userId: number) => {
  return await db.bookmark.findFirst({
    where: {
      articleId,
      userId,
    },
  });
};
