import {Client} from "pg";
import 'dotenv/config';

const dbUrl = process.env.NODE_ENV === 'production'
    ? process.env.PROD_DATABASE_URL
    : process.env.DEV_DATABASE_URL;

async function main() {
    const client = new Client({
        connectionString: dbUrl,
        // ssl: {rejectUnauthorized: false}
    });

    try {
        await client.connect();
        console.log("Seeding...");

        await client.query(`
            CREATE TABLE IF NOT EXISTS users
            (
                user_id
                INTEGER
                PRIMARY
                KEY
                GENERATED
                ALWAYS AS
                IDENTITY,
                user_first_name
                VARCHAR
            (
                255
            ) NOT NULL,
                user_last_name VARCHAR
            (
                255
            ) NOT NULL,
                username VARCHAR
            (
                255
            ) NOT NULL UNIQUE,
                password VARCHAR
            (
                255
            ) NOT NULL,
                is_member BOOLEAN DEFAULT FALSE NOT NULL,
                is_admin BOOLEAN DEFAULT FALSE NOT NULL
                );

            CREATE TABLE IF NOT EXISTS messages
            (
                message_id
                INTEGER
                PRIMARY
                KEY
                GENERATED
                ALWAYS AS
                IDENTITY,
                message_title
                TEXT
                NOT
                NULL,
                message_text
                TEXT
                NOT
                NULL,
                date
                TIMESTAMP,
                user_id
                INTEGER
                NOT
                NULL
                REFERENCES
                users
            (
                user_id
            )
                );`);

        console.log("Done!");
    } catch (err) {
        console.error("Error seeding database:", err);
    } finally {
        await client.end();
    }
}

main();