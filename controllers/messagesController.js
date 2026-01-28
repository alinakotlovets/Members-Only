import {addMessageToBd} from "../db/queries.js";
import {body, validationResult, matchedData} from "express-validator";

export const validateMessage = [
    body("title")
        .trim()
        .notEmpty().withMessage("Title is required")
        .isLength({min: 3}).withMessage("Title need at least 3 symbols"),
    body("message")
        .trim()
        .notEmpty().withMessage("Message is required")
        .isLength({min: 3, max: 100}).withMessage("Message need at least 3 symbols and not more than 100 symbols"),
]

export function getAddMessage(req, res) {
    res.render("addMessage", {errors: [], title: "", message: ""});
}

export async function postMessage(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render("addMessage", {
            errors: errors.array(),
            title: req.body.title,
            message: req.body.message
        });
    }
    const userId = req.user.user_id;
    if (!userId) {
        return res.status(400).render("addMessage", {
            errors: [{msg: "user not found"}],
            title: req.body.title,
            message: req.body.message
        });
    }
    let {title, message} = matchedData(req);
    await addMessageToBd(title, message, userId);
    res.redirect("/");
}