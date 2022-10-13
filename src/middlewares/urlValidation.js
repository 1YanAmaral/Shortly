import connection from "../connection.js";

async function validateUrl(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  const { url } = req.body;

  if (!token) {
    return res.sendStatus(401);
  }

  const session = await connection.query(
    `SELECT * FROM sessions WHERE token = '${token}';`
  );
  if (session.rowCount === 0) {
    return res.sendStatus(401);
  }
  const userId = session.rows[0].userId;

  const user = await connection.query(
    `SELECT id FROM users WHERE users.id = ${userId}`
  );

  if (user.rowCount === 0) {
    return res.sendStatus(401);
  }

  try {
    const valid = new URL(url);
    console.log("Valid URL");
    res.locals.userId = userId;
    next();
  } catch (err) {
    console.log(url);
    console.log("Invalid URL");
    res.sendStatus(422);
  }
}

export default validateUrl;
