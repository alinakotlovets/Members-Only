import {getAllMessages} from "../db/queries.js";

export async function getIndex(req, res) {
    const messages = await getAllMessages();
    res.render("index", {messages: messages});
}