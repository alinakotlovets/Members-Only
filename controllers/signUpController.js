import bcrypt from "bcryptjs"
import {addUserToBd} from "../db/queries.js";
import {body, validationResult, matchedData} from "express-validator";

export const validateUser = [
    body("firstName")
        .trim()
        .notEmpty().withMessage("First name is required")
        .isLength({min: 2}).withMessage("First name must have at least 2 letter"),
    body("lastName")
        .trim()
        .notEmpty().withMessage("Last name is required")
        .isLength({min: 2}).withMessage("First name must have at least 2 letter"),
    body("username")
        .trim()
        .notEmpty().withMessage("Username is required")
        .isLength({min: 4}).withMessage("First name must have at least 4 letter"),
    body("password")
        .trim()
        .notEmpty().withMessage("Password must be not empty")
        .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
        .matches(/[0-9]/).withMessage("Password must contain at least one number")
        .isLength({min: 8}).withMessage("Password must have at least 8 symbols"),
    body("confirmPassword")
        .custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error("Passwords do not match");
            }
            return true;
        })
]

export function getSignUp(req, res) {
    res.render("signUp", {errors: [], firstName: "", lastName: "", username: "", password: "", confirmPassword: ""});
}

export async function postSignUp(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render("signUp", {
            errors: errors.array(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        })
    }
    const {firstName, lastName, username, password, confirmPassword} = matchedData(req);
    const hashedPassword = await bcrypt.hash(password, 10);
    await addUserToBd(firstName, lastName, username, hashedPassword);
    res.redirect("/sign-in");

}