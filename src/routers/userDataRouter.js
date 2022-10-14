import validateUserData from "../middlewares/userDataValidation.js";
import express from "express";
import { getUserData } from "../controllers/userController.js";

const userDataRouter = express.Router();

userDataRouter.get("/users/me", validateUserData, getUserData);

export default userDataRouter;
