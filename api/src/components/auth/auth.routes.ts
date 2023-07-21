import express from "express";
import {
  protectedRoute,
  register,
  signIn,
  validateJWT,
} from "./auth.controller";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/signin", signIn);
authRouter.get("/protected", validateJWT, protectedRoute);

export default authRouter;
