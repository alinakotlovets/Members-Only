import {Router} from "express";
import {getIndex, logOut} from "../controllers/indexController.js";

const indexRouter = Router();

indexRouter.get("/", getIndex);
indexRouter.get("/log-out", logOut);
export default indexRouter;
