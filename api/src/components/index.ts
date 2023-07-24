import { Router } from "express";
import salesRouter from "./sales/sales.routes";
import productsRouter from "./products/products.routes";
import cartRouter from "./cart/cart.routes";
import colorsRouter from "./colors/colors.routes";
import S3Router from "./S3/S3.routes";
const mainRouter = Router();

mainRouter.use("/api/sales", salesRouter);
mainRouter.use("/api/products", productsRouter);
mainRouter.use("/api/cart", cartRouter);
mainRouter.use("/api/colors", colorsRouter);
mainRouter.use("/api/S3", S3Router);

export default mainRouter;
