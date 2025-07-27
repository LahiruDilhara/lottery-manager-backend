import express from 'express';
import ResolverController from '../controllers/resolverController';

const resolverRouter = express.Router();

resolverRouter.get("/", ResolverController.getAllResolvers);
resolverRouter.get("/lottery/:lotteryCodeId", ResolverController.getResolversByLotteryCodeId);
resolverRouter.post("/", ResolverController.addResolver);
resolverRouter.patch("/:id", ResolverController.updateResolverById);
resolverRouter.delete("/:id", ResolverController.deleteResolverById);

export default resolverRouter;