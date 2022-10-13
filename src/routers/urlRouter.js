import {
  postUrl,
  getUrl,
  openUrl,
  deleteUrl,
} from "../controllers/urlController.js";
import express from "express";
import {
  validateUrl,
  validateDeleteUrl,
} from "../middlewares/urlValidation.js";

const urlRouter = express.Router();

urlRouter.post("/urls/shorten", validateUrl, postUrl);
urlRouter.get("/urls/:id", getUrl);
urlRouter.get("/urls/open/:shortUrl", openUrl);
urlRouter.delete("/urls/:id", validateDeleteUrl, deleteUrl);

export default urlRouter;
