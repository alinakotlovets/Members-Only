import bcrypt from "bcryptjs"
import passport from "passport";
import {Strategy as LocalStrategy} from 'passport-local';
import {getUserById, getUserByUsername} from "../db/queries.js";


export function initializePassport() {
    passport.use(new LocalStrategy(async (username, password, done) => {
        try {
            const user = await getUserByUsername(username);

            if (!user[0]) {
                return done(null, false, {message: "Incorrect username"});
            }
            const match = await bcrypt.compare(password, user[0].password);
            if (!match) {
                return done(null, false, {message: "Incorrect password"})
            }
            return done(null, user[0]);
        } catch (err) {
            return done(err);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.user_id);
    });
    passport.deserializeUser(async (id, done) => {
        try {

            const user = await getUserById(id);

            done(null, user[0]);
        } catch (err) {
            done(err);
        }
    });
    return passport;
}