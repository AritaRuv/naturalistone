import express from "express";
import { register } from "./login.controller";

const loginRouter = express.Router();

loginRouter.post("/register", register);

export default loginRouter;
