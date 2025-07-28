import express from 'express';
import UserController from '../controllers/user_controller';

const userRouter = express.Router();

userRouter.post("/", UserController.addUser);

export default userRouter;