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
    await pool.query("INSERT INTO messages (message_title, message_text, user_id, date) VALUES ($1, $2, $3, NOW())", [title, message, userId]);
}

export async function getAllMessages() {
    const query = `
        SELECT messages.message_id,
               messages.message_title,
               messages.message_text,
               messages.date,
               users.username
        FROM messages
                 JOIN users ON messages.user_id = users.user_id
        ORDER BY messages.date DESC;
    `;
    const {rows} = await pool.query(query);
    return rows;
}

export async function addMembershipStatus(userId) {
    await pool.query("UPDATE users SET is_member = true WHERE user_id = $1", [userId])
}

export async function addAdminStatus(userId) {
    await pool.query("UPDATE users SET is_member = true, is_admin = true WHERE user_id = $1", [userId])
}

export async function deleteMessageById(messageId) {
    await pool.query("DELETE FROM messages WHERE message_id = $1", [messageId]);
}