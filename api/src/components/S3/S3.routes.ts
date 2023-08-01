import { Router } from "express";
import {
   getAllProductsImages,
} from "./S3.controller";

const S3Router: Router = Router();

S3Router.get("/:folder/:fileName", getAllProductsImages);


export default S3Router;
