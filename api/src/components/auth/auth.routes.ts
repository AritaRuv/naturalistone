import express from "express";
import {
  protectedRoute,
  signUp,
  signIn,
  validateJWT,
  userInfo,
  updateUser,
} from "./auth.controller";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.get("/userinfo", userInfo);
authRouter.patch("/", validateJWT, updateUser);
authRouter.get("/protected", validateJWT, protectedRoute);

export default authRouter;
