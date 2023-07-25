import { Router } from "express";
import { sendEmail } from "./postmark.controller";

const postmarkRouter = Router();

postmarkRouter.post("/sendemailnaturali", sendEmail);

export default postmarkRouter;
