import { Router } from "express";
import salesRouter from "./sales/sales.routes";
import productsRouter from "./products/products.routes";
import cartRouter from "./cart/cart.routes";
import colorsRouter from "./colors/colors.routes";
import authRouter from "./auth/auth.routes";
import postmarkRouter from "./postmark/postmark.routes";
import favoritesRouter from "./favorites/favorites.routes";
import S3Router from "./S3/S3.routes";
import projectsRouter from "./projects/projects.routes";
import chekoutRouter from "./checkout/checkout.routes";
import addressRouter from "./address/address.routes";
const mainRouter = Router();

mainRouter.use("/api/sales", salesRouter);
mainRouter.use("/api/products", productsRouter);
mainRouter.use("/api/cart", cartRouter);
mainRouter.use("/api/colors", colorsRouter);
mainRouter.use("/api/auth", authRouter);
mainRouter.use("/api/email", postmarkRouter);
mainRouter.use("/api/favorites", favoritesRouter);
mainRouter.use("/api/S3", S3Router);
mainRouter.use("/api/projects", projectsRouter);
mainRouter.use("/api/checkout", chekoutRouter);
mainRouter.use("/api/address", addressRouter);

export default mainRouter;
