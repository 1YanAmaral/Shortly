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

export async function getUrl(req, res) {
  const urlId = req.params.id;

  try {
    const url = await connection.query(
      `SELECT id, "shortUrl", url FROM urls WHERE urls.id = $1;`,
      [urlId]
    );

    if (url.rowCount === 0) {
      return res.sendStatus(404);
    }

    res.status(200).send(url.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
}

export async function openUrl(req, res) {
  const shortUrl = req.params.shortUrl;

  try {
    const validUrl = await connection.query(
      `SELECT id, url FROM urls WHERE urls."shortUrl" = $1;`,
      [shortUrl]
    );
    if (validUrl.rowCount === 0) {
      return res.sendStatus(404);
    }

    const urlId = validUrl.rows[0].id;
    const fullUrl = validUrl.rows[0].url;

    await connection.query(`INSERT INTO visits ("urlId") VALUES ($1);`, [
      urlId,
    ]);

    res.redirect(`${fullUrl}`);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
}

export async function deleteUrl(req, res) {
  const urlId = req.params.id;

  try {
    await connection.query(`DELETE FROM visits WHERE visits."urlId" = $1;`, [
      urlId,
    ]);
    await connection.query(`DELETE FROM urls WHERE urls.id = $1;`, [urlId]);
    res.sendStatus(204);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
}
