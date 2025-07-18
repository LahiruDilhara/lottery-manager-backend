import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import lotteryRouter from '../routes/lotteryRoute';
import resultRouter from '../routes/resultRoute';
import checkerRouter from '../routes/checkerRoute';
import resultCheckRouter from '../routes/resultCheckRoute';

export default function configMiddlewareAndRoutes(app: Application): void {
    // Enable CORS
    app.use(cors());

    // Use Helmet for security
    app.use(helmet());

    // Use Morgan for logging
    app.use(morgan('combined'));

    // Parse JSON bodies
    app.use(express.json());

    configRouteMiddlware(app);
}

function configRouteMiddlware(app: Application): void {
    app.use('/api/v1/lotteries', lotteryRouter);
    app.use("/api/v1/results", resultRouter);
    app.use("/api/v1/checkers", checkerRouter);
    app.use("/api/v1/result-checks", resultCheckRouter);
}