import Joi from "joi";

export class Failure {
    constructor(
        public readonly message: string,
        public readonly code: number = 500
    ) { }

    static fromError(error: Error): Failure {
        return new Failure(error.message, 500);
    }

    static fromMessage(message: string, code: number = 500): Failure {
        return new Failure(message, code);
    }

    static fromJoiError(error: Joi.ValidationError, code: number = 400): Failure {
        let errorMessage: string = error.details.map(detail => detail.message.replace(/\"/g, "'")).join(" , ").toString();
        return new Failure(errorMessage, code);
    }

    
}