import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import connection from "../connection.js";

export async function signUp(req, res) {
  const { name, email, password, confirmPassword } = req.body;
  const passwordHash = bcrypt.hashSync(password, 10);

  try {
    const existingEmail = await connection.query(
      `SELECT * FROM users WHERE email = '${email}';`
    );
    const compare = existingEmail.rows[0].email;
    if (compare) {
      return res.sendStatus(409);
    }

    await connection.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
      [name, email, passwordHash]
    );
    console.log(existingEmail);
    res.sendStatus(201);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
}
