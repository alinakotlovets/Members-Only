import {Router} from "express";
import {getSignUp, postSignUp, validateUser} from "../controllers/signUpController.js";

const signUpRouter = Router();

signUpRouter.get("/", getSignUp);
signUpRouter.post("/", validateUser, postSignUp);

export default signUpRouter;