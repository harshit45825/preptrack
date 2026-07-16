import Express from "express";
import {signIn, signUp, signInByGoogle } from "../controller/AuthController";

const authRouter = Express.Router();
authRouter.post("/auth/signup", signUp);
authRouter.post("/auth/signin", signIn);
authRouter.post("/auth/signin/google", signInByGoogle);

export default authRouter;