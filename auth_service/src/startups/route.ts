import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import userRouter from '../routes/user_router';
import validationRouter from '../routes/validation_router';

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
    app.use("/api/v1/users", userRouter);
    app.use("/api/v1/validate",validationRouter);
}