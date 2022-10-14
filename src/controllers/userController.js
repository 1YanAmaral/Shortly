import connection from "../connection.js";

export async function getUserData(req, res) {
  const userId = res.locals.userId;

  try {
    const userData = (
      await connection.query(
        `SELECT users.id AS id, users.name AS name, SUM(visits."visitNum") AS "visitCount"
    FROM visits
    JOIN urls ON urls.id = visits."urlId"
    JOIN users ON users.id = urls."userId"
    WHERE users.id = $1
    GROUP BY users.id, users.name;`,
        [userId]
      )
    ).rows[0];

    const shortenedUrls = (
      await connection.query(
        `SELECT urls.id AS id, urls."shortUrl" AS "shortUrl", urls.url AS url, SUM(visits."visitNum") AS "visitCount"
    FROM urls
    JOIN visits ON urls.id = visits."urlId"
    JOIN users ON users.id = urls."userId"
    WHERE urls.id = visits."urlId" AND users.id = $1
    GROUP BY urls.id, urls."shortUrl", urls.url;`,
        [userId]
      )
    ).rows;

    const resultObject = { ...userData, shortenedUrls: shortenedUrls };

    res.status(200).send(resultObject);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
}
