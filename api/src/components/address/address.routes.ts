import { Router } from "express";
import { getAllCustomerAddress
} from "./address.controller";

const addressRouter: Router = Router();

addressRouter.get("/get_all", getAllCustomerAddress);


export default addressRouter;
