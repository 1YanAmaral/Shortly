import { postUrl, getUrl, openUrl } from "../controllers/urlController.js";
import express from "express";
import validateUrl from "../middlewares/urlValidation.js";

const urlRouter = express.Router();

urlRouter.post("/urls/shorten", validateUrl, postUrl);
urlRouter.get("/urls/:id", getUrl);
urlRouter.get("/urls/open/:shortUrl", openUrl);

export default urlRouter;
