import express from 'express';
import QrExecutorController from '../controllers/qrExecutorController';

const qrExecutorRouter = express.Router();

qrExecutorRouter.post('/', QrExecutorController.executeQr);

export default qrExecutorRouter;
