import express from 'express';
import ValidationController from '../controllers/validation_controller';

const validationRouter = express.Router();

validationRouter.get("/bearer", ValidationController.validateJWTBearerTokenUser);

export default validationRouter;