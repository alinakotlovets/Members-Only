import {Router} from "express";
import {getMembershipPage, validateMembership, postMembership} from "../controllers/membershipController.js";

const membershipRouter = Router();

membershipRouter.get("/", getMembershipPage);
membershipRouter.post("/", validateMembership, postMembership);
export default membershipRouter;