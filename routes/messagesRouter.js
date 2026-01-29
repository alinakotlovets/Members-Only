import {Router} from "express";
import {getAddMessage, postMessage, validateMessage, deleteMessage} from "../controllers/messagesController.js";

const messagesRouter = Router();


messagesRouter.get("/add", getAddMessage)
messagesRouter.post("/add", validateMessage, postMessage)
messagesRouter.post("/:messageId", deleteMessage);

export default messagesRouter;