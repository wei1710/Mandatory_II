import db from "./connection.js";

const isDeleteMode = process.argv.includes("delete");

if (isDeleteMode) {
  await db.run(`DROP TABLE IF EXISTS users`);
}

await db.exec(`CREATE TABLE IF NOT EXISTS users(
               id INTEGER PRIMARY KEY AUTOINCREMENT,
               username VARCHAR(255) NOT NULL,
               password VARCHAR(255) NOT NULL,
               email VARCHAR(255) NOT NULL,
               is_signed_up BOOLEAN,
               verified BOOLEAN,
               session_id VARCHAR(255),
               verification_token VARCHAR(255),
               verification_key VARCHAR(255),
               expiration_timestamp INTEGER,
               reset_token VARCHAR(255),
               reset_timestamp INTEGER
)`);

if (isDeleteMode) {
  // test user 1
  await db.run(`INSERT INTO users (
                username, 
                password, 
                email, 
                is_signed_up, 
                verified
              ) VALUES (
                "test1t", 
                "$2b$10$7KFRq6.fSMdNA0OoLZ9XnueSm33Tnv.8sY58ej5dpUh7Yrb7svF5G",
                "test1@gmail.com",
                TRUE,
                TRUE
              )`);
  // test user 2
  await db.run(`INSERT INTO users (
                username, 
                password, 
                email, 
                is_signed_up, 
                verified
              ) VALUES (
                "test2t", 
                "$2b$10$lzGn5RlBjQxmMgOUMSB5UeZ6Wh5J2kSDmsEhaK4dTvnW/armWEcZ2",
                "test2@gmail.com",
                TRUE,
                TRUE
              )`);
  // test user 3
  await db.run(`INSERT INTO users (
                username, 
                password, 
                email, 
                is_signed_up, 
                verified
              ) VALUES (
                "test3t", 
                "$2b$10$i4gqSJB0TdZlnQV8oJMSn.atCAx/pWliVfz6WFdovsI6UhkRN5MN.",
                "test3@gmail.com",
                TRUE,
                TRUE
              )`);
}