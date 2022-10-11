import express from "express";

const server = express();
server.use(express.json());

server.get("/status", async (req, res) => {
  res.send("OK");
});

server.listen(4000, () => {
  console.log("Server listening on port 4000.");
});
