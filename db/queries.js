import {pool} from "./pool.js";

export async function getUserById(id) {
    const {rows} = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);
    return rows;
}

export async function getUserByUsername(username) {
    const {rows} = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    return rows;
}

export async function addUserToBd(firstName, lastName, username, password) {
    await pool.query("INSERT INTO users (user_first_name, user_last_name, username, password) VALUES ($1, $2, $3, $4)", [firstName, lastName, username, password]);
}

export async function addMessageToBd(title, message, userId) {
    await pool.query("INSERT INTO messages (message_title, message_text, user_id) VALUES ($1, $2, $3)", [title, message, userId]);
}

export async function getAllMessages() {
    const {rows} = await pool.query("SELECT * FROM messages")
    return rows;
}