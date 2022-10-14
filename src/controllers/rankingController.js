import connection from "../connection.js";

export async function getRanking(req, res) {
  try {
    const ranking = (
      await connection.query(`SELECT users.id AS id, users.name AS name, COUNT(urls.id) AS "linksCount", SUM(visits."visitNum") AS "visitCount"
    FROM users
    JOIN urls ON users.id = urls."userId"
    JOIN visits ON urls.id = visits."urlId"
    GROUP BY users.id, users.name
    ORDER BY "visitCount" DESC LIMIT 10;`)
    ).rows;

    res.status(200).send(ranking);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
}
