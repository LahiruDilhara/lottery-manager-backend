import jwt, { SignOptions } from 'jsonwebtoken';
import c from 'config';
import User from '../model/User';
import { inject, singleton } from 'tsyringe';
import JwtTokenPayloadEntity from '../entities/JwtTokenPayloadEntity';


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

    verifyToken(token: string): boolean {
        try {
            jwt.verify(token, jwtSecret);
            return true;
        } catch (error) {
            console.error("JWT verification failed:", error);
            return false;
        }
    }

    verifyBearerToken(bearerToken: string): boolean {
        if (!bearerToken.startsWith("Bearer ")) {
            return false;
        }
        const token = bearerToken.slice(7);
        return this.verifyToken(token);
    }

    decodeToken(token: string): JwtTokenPayloadEntity | null {
        try {
            const decoded = jwt.verify(token, jwtSecret) as JwtTokenPayloadEntity;
            return decoded;
        } catch (error) {
            console.error("JWT decoding failed:", error);
            return null;
        }
    }
}
