import express from 'express';
import UserController from '../controllers/user_controller';

const userRouter = express.Router();

userRouter.post("/", UserController.addUser);
userRouter.get("/:id", UserController.getUserById);
userRouter.get("/name/:name", UserController.getUserByName);
userRouter.patch("/:id", UserController.updateUser);
userRouter.delete("/:id", UserController.deleteUser);
userRouter.get("/", UserController.getAllUsers);
userRouter.post("/:id/block", UserController.setBlockUser);
userRouter.post("/:id/change-password", UserController.changePassword);
userRouter.post("/:id/reset-password", UserController.setResetPassword);
userRouter.post("/:id/restore-password", UserController.restorePassword);
userRouter.post("/sign-in", UserController.signIn);
userRouter.post("/sign-up", UserController.signUp);

export default userRouter;