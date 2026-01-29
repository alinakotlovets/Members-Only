import {Router} from "express";
import {getAdmin, adminValidate, postAdmin} from "../controllers/adminController.js";

const adminRouter = Router();

adminRouter.get("/", getAdmin);
adminRouter.post("/", adminValidate, postAdmin);


export default adminRouter;