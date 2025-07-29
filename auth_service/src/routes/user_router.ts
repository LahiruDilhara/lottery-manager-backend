import express from 'express';
import UserController from '../controllers/user_controller';

const userRouter = express.Router();

userRouter.post("/", UserController.addUser);
userRouter.get("/:id", UserController.getUserById);
userRouter.get("/name/:name", UserController.getUserByName);
userRouter.patch("/:id", UserController.updateUser);
userRouter.delete("/:id", UserController.deleteUser);
userRouter.get("/", UserController.getAllUsers);

export default userRouter;