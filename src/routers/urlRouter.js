import { postUrl } from "../controllers/urlController.js";
import express from "express";
import validateUrl from "../middlewares/urlValidation.js";

const urlRouter = express.Router();

urlRouter.post("/urls/shorten", validateUrl, postUrl);

export default urlRouter;
