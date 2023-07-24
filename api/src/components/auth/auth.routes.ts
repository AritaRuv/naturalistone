import express from "express";
import {
  protectedRoute,
  register,
  signIn,
  validateJWT,
  userInfo,
} from "./auth.controller";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/signin", signIn);
authRouter.get("/userinfo", userInfo);
authRouter.get("/protected", validateJWT, protectedRoute);

export default authRouter;
