import { signUp } from "../controllers/authController.js";
import express from "express";
import validateUser from "../middlewares/userValidation.js";

const authRouter = express.Router();

authRouter.post("/signup", validateUser, signUp);

export default authRouter;
