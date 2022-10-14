import express from "express";
import authRouter from "./routers/authRouter.js";
import rankingRouter from "./routers/rankingRouter.js";
import urlRouter from "./routers/urlRouter.js";
import userDataRouter from "./routers/userDataRouter.js";

const server = express();
server.use(express.json());

server.get("/status", async (req, res) => {
  res.send("OK");
});

server.use(authRouter);
server.use(urlRouter);
server.use(userDataRouter);
server.use(rankingRouter);

server.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
