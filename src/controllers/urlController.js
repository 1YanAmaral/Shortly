import connection from "../connection.js";
import { customAlphabet } from "nanoid";

export async function postUrl(req, res) {
  const { url } = req.body;
  const nanoid = customAlphabet("1234567890abcdef", 8);
  const shortUrl = nanoid();
  const userId = res.locals.userId;

  try {
    await connection.query(
      `INSERT INTO urls (url, "userId", "shortUrl") VALUES ($1, $2, $3);`,
      [url, userId, shortUrl]
    );

    res.status(201).send({ shortUrl: shortUrl });
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
}
