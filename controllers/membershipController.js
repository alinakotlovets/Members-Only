import {body, matchedData, validationResult} from "express-validator";
import 'dotenv/config';
import {addMembershipStatus} from "../db/queries.js";

export const validateMembership = [
    body("membershipCode")
        .trim()
        .notEmpty().withMessage("Membership code is required")
]

export function getMembershipPage(req, res) {
    if (!req.user) {
        return res.redirect("/sign-in");
    }
    res.render("membership", {errors: [], membershipCode: ""});
}

export async function postMembership(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render("membership", {
                errors: errors.array(),
                membershipCode: req.body.membershipCode
            }
        )
    }
    let {membershipCode} = matchedData(req);
    const code = process.env.MEMBERSHIP_CODE;
    if (membershipCode !== code) {
        return res.status(400).render("membership", {
                errors: [{msg: "Code not right!"}],
                membershipCode: req.body.membershipCode
            }
        )
    }

    const userId = req.user.user_id;
    await addMembershipStatus(userId);
    res.redirect("/");

}