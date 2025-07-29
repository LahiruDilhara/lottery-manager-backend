import { container } from "tsyringe";
import ValidationService from "../services/ValidationService";
import { Failure } from "../core/Failure";

const service = container.resolve(ValidationService);

export default class ValidationController {
    static async validateJWTBearerTokenUser(req: any, res: any) {
        const bearerToken = req.headers.authorization;
        if (!bearerToken) {
            return res.status(401).send(new Failure("Bearer token is required", 401));
        }

        const resultOrError = await service.validateJWTBearerTokenUser(bearerToken);

        if (resultOrError.isErr()) {
            return res.status(resultOrError.error.code).send(resultOrError.error);
        }

        return res.status(200).send({ message: "User is valid" });
    }
}