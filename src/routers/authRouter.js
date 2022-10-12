import { signUp, signIn } from "../controllers/authController.js";
import express from "express";
import validateUser from "../middlewares/userValidation.js";
import validateLogin from "../middlewares/loginValidation.js";

const authRouter = express.Router();

authRouter.post("/signup", validateUser, signUp);
authRouter.post("/signin", validateLogin, signIn);

export default authRouter;
