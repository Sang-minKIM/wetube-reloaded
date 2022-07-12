import express from "express";
import { join, login } from "../components/userController";
import { home, search } from "../components/videoController";

const globalRouter = express.Router();
globalRouter.get("/", home);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/search", search);

export default globalRouter;
