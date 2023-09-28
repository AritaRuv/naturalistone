import { Router } from "express";
import { getAllCustomerAddress, postNewAddress
} from "./address.controller";

const addressRouter: Router = Router();

addressRouter.get("/get_all", getAllCustomerAddress);
addressRouter.post("/create", postNewAddress);


export default addressRouter;
