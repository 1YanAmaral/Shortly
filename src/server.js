import express from "express";
import connection from "./connection.js";
import authRouter from "./routers/authRouter.js";

const server = express();
server.use(express.json());

server.get("/status", async (req, res) => {
  res.send("OK");
});

server.use(authRouter);

server.listen(4000, () => {
  console.log("Server listening on port 4000.");
});
