import { Router } from "express";
import { newCheckout } from "./checkout.controller";

const checkoutRouter: Router = Router();

checkoutRouter.post("/", newCheckout);

export default checkoutRouter;
