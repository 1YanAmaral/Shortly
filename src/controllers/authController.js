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

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await connection.query(
      `SELECT * FROM users WHERE email = '${email}';`
    );

    if (!user) {
      return res.status(401).send("Usuário ou senha não encontrada");
    }

    const isValid = bcrypt.compareSync(password, user.rows[0].password);

    if (!isValid) {
      return res.status(401).send("Usuário ou senha não encontrada");
    }

    const token = uuid();

    await connection.query(
      `INSERT INTO sessions ("userId", token) VALUES ($1, $2);`,
      [user.rows[0].id, token]
    );

    res.send({ token: token }).status(200);
    //res.send(user.rows[0].password);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
}
