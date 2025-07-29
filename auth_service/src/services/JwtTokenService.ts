import jwt, { SignOptions } from 'jsonwebtoken';
import c from 'config';
import User from '../model/User';
import { singleton } from 'tsyringe';
import JwtTokenPayloadEntity from '../entities/JwtTokenPayloadEntity';
import { ok, err, Result } from 'neverthrow';
import { Failure } from '../core/Failure';
import debug from 'debug';

const jwtSecret = c.get("jwtSecret") as string;
const jwtExpiration = c.get("jwtExpiration") as `${number}${"ms" | "s" | "m" | "h" | "d" | "w" | "y"}`;

@singleton()
export default class JwtTokenService {

    // Implementation of JWT token generation and validation

    generateToken(user: User): string {
        const jwtTokenPayload = JwtTokenPayloadEntity.fromUser(user);
        const payload = { ...jwtTokenPayload }
        const options: SignOptions = {
            expiresIn: jwtExpiration
        }
        const token = jwt.sign(payload, jwtSecret, options);
        return token;
    };

    decodeToken(token: string): Result<JwtTokenPayloadEntity, Failure> {
        try {
            const decoded = jwt.verify(token, jwtSecret);
            if (typeof decoded !== "object" || !decoded) {
                return err(new Failure("Invalid JWT token", 401));
            }
            const payload = JwtTokenPayloadEntity.fromAny(decoded);
            const validationResult = payload.isValid();
            if (validationResult.isErr()) {
                return err(new Failure("Invalid JWT token payload", 401));
            }
            return ok(payload);
        } catch (error) {
            debug("error")("JWT decoding failed:", error);
            return err(new Failure("JWT decoding failed", 401));
        }
    }

    decodeBearerToken(bearerToken: string): Result<JwtTokenPayloadEntity, Failure> {
        if (!bearerToken.startsWith("Bearer ")) {
            return err(new Failure("Invalid Bearer token format", 400));
        }
        const token = bearerToken.slice(7);
        return this.decodeToken(token);
    }
}