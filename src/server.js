import express from "express";
import authRouter from "./routers/authRouter.js";
import urlRouter from "./routers/urlRouter.js";

const server = express();
server.use(express.json());

server.get("/status", async (req, res) => {
  res.send("OK");
});

server.use(authRouter);
server.use(urlRouter);

server.listen(4000, () => {
  console.log("Server listening on port 4000.");
});
