import express from "express";
import {
  getUser,
  getUsers,
  login,
  register,
} from "../controller/userController";
import auth from "../middleware/auth";
import {
  createArticle,
  getArticle,
  getArticles,
} from "../controller/articleController";
import { uploadFile } from "../middleware/upload";
import {
  createBookmark,
  getAllBookmark,
  getCurrentBookmark,
} from "../controller/bookmarkController";

const Route = express.Router();

Route.post("/register", register);
Route.post("/login", login);
Route.get("/users", auth, getUsers);
Route.get("/user/:id", auth, getUser);

Route.post("/article", auth, uploadFile("image"), createArticle);
Route.get("/articles", getArticles);
Route.get("/article/:id", auth, getArticle);

Route.post("/bookmark", auth, createBookmark);
Route.get("/bookmark", auth, getAllBookmark);
Route.get("/bookmark/:articleId", auth, getCurrentBookmark);

export default Route;
