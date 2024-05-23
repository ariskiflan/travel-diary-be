import db from "../db";
import { IArticle } from "../type/app";

export const getArticles = async () => {
  return await db.article.findMany({
    include: {
      user: {
        select: {
          id: true,
          email: true,
          fullname: true,
          phone: true,
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });
};

export const getArticle = async (id: number) => {
  return await db.article.findFirst({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          fullname: true,
          phone: true,
        },
      },
    },
  });
};

// export const getThreadByToken = async (id: number) => {
//   return await db.article.findMany({
//     where: {
//       userId: id,
//       threadId: null,
//     },
//     include: {
//       image: {
//         select: {
//           image: true,
//         },
//       },
//       auhtor: {
//         select: {
//           username: true,
//           id: true,
//           fullname: true,
//           profile: {
//             select: {
//               avatar: true,
//             },
//           },
//         },
//       },
//       _count: {
//         select: {
//           replies: true,
//           like: true,
//         },
//       },
//     },
//     orderBy: {
//       id: "desc",
//     },
//   });
// };

// export const getThreadByUserId = async (id: number) => {
//   return await db.article.findMany({
//     where: {
//       userId: id,
//       threadId: null,
//     },
//     include: {
//       image: {
//         select: {
//           image: true,
//         },
//       },
//       auhtor: {
//         select: {
//           username: true,
//           id: true,
//           fullname: true,
//           thread: {
//             select: {
//               content: true,
//               posted_at: true,
//               id: true,
//             },
//           },
//           profile: {
//             select: {
//               avatar: true,
//             },
//           },
//         },
//       },
//       _count: {
//         select: {
//           replies: true,
//           like: true,
//         },
//       },
//     },
//     orderBy: {
//       id: "desc",
//     },
//   });
// };

export const createArticle = async (body: any) => {
  const articles = await db.article.create({
    data: {
      ...body,
    },
  });

  return articles;
};
