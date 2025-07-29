import { err, ok, Result } from "neverthrow";
import { inject, singleton } from "tsyringe";
import { Failure } from "../core/Failure";
import JwtTokenService from "./JwtTokenService";
import UserService from "./User_service";

@singleton()
export default class ValidationService {
    constructor(@inject(JwtTokenService) private jwtTokenService: JwtTokenService, @inject(UserService) private userService: UserService) { }
    async validateJWTBearerTokenUser(bearerToken: string): Promise<Result<void, Failure>> {
        const jwtTokenOrError = this.jwtTokenService.decodeBearerToken(bearerToken);
        if (jwtTokenOrError.isErr()) {
            return err(jwtTokenOrError.error);
        }

        const jwtToken = jwtTokenOrError.value;
        const userOrError = await this.userService.getUserById(jwtToken.id);
        if (userOrError.isErr()) {
            return err(userOrError.error);
        }

        const user = userOrError.value;

        if (user.blocked) {
            return err(new Failure("User is blocked", 403));
        }

        if (user.canResetPassword) {
            return err(new Failure("Please reset your password", 403));
        }
        return ok(undefined);
    }
}