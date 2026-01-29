import {body, validationResult, matchedData} from "express-validator";
import 'dotenv/config';
import {addAdminStatus} from "../db/queries.js";


export const adminValidate = [
    body("adminCode")
        .trim()
        .notEmpty().withMessage("Admin code is required")
]


export function getAdmin(req, res) {
    if (!req.user) {
        return res.redirect("/sign-in");
    }
    res.render("admin", {errors: [], adminCode: ""});
}

export async function postAdmin(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render("admin", {
                errors: errors.array(),
                adminCode: req.body.adminCode
            }
        )
    }

    let {adminCode} = matchedData(req);
    const code = process.env.ADMIN_CODE;
    if (adminCode !== code) {
        return res.status(400).render("admin", {
                errors: [{msg: "Code not right!"}],
                adminCode: req.body.adminCode
            }
        )
    }
    const userId = req.user.user_id;
    await addAdminStatus(userId);
    res.redirect("/");

}