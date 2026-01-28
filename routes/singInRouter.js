import {Router} from "express";
import {getSignIn, postSignIn, userValidate} from "../controllers/signInController.js";

const singInRouter = Router();
singInRouter.get("/", getSignIn);
singInRouter.post("/", userValidate, postSignIn)

export default singInRouter;