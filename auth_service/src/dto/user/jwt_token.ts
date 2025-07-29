import User from "../../model/User";

export default class JwtTokenDto {
    token: string;

    constructor(token: string) {
        this.token = token;
    }
}