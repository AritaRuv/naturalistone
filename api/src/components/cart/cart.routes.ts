import { Router } from "express";
import { newCartEntry, getCartProducts, updateCartProducts, deleteCartProducts } from "./cart.controller";
import { confirmCheckout } from "../checkout/checkout.controller";

const cartRouter: Router = Router();

cartRouter.post("/", newCartEntry );
cartRouter.patch("/", updateCartProducts );
cartRouter.get("/:id", getCartProducts );
cartRouter.delete("/:idCartEntry", deleteCartProducts );

export default cartRouter;
