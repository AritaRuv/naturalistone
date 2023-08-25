import express from "express";
import {
  protectedRoute,
  signUp,
  signIn,
  validateJWT,
  userInfo,
  updateUser,
  generateResetToken,
  validateResetToken,
  changePassword,
} from "./auth.controller";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.get("/userinfo", userInfo);
authRouter.patch("/", validateJWT, updateUser);
authRouter.get("/protected", validateJWT, protectedRoute);
authRouter.patch("/reset_token", generateResetToken);
authRouter.patch("/reset_token/password", changePassword);
authRouter.get("/reset_token/:token", validateResetToken);

export default authRouter;
