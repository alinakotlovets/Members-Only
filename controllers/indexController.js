import {getAllMessages} from "../db/queries.js";

export async function getIndex(req, res) {
    const messages = await getAllMessages();
    const messageWithFormatedDate = messages.map(msg => ({
        ...msg,
        formattedDate: new Intl.DateTimeFormat("uk-UA", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(new Date(msg.date))
    }));
    res.render("index", {messages: messageWithFormatedDate});
}

export function logOut(req, res) {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/sign-in");
    });
}