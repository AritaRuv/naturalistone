import { Router } from "express";
import { confirmCheckout, newCheckout } from "./checkout.controller";

const checkoutRouter: Router = Router();

checkoutRouter.post("/", newCheckout);
checkoutRouter.patch("/", confirmCheckout);

export default checkoutRouter;
