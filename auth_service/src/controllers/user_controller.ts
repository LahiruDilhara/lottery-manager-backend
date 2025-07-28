import { container } from "tsyringe";
import UserService from "../services/User_service";
import AddUserDto from "../dto/user/add_user_dto";
import UserDto from "../dto/user/user_dto";

const service = container.resolve(UserService);

export default class UserController {
    static async addUser(req: any, res: any) {
        const dto = AddUserDto.fromAny(req.body);
        const result = dto.isValid();
        if (result.isErr()) {
            return res.status(result.error.code).send(result.error);
        }

        const resultOrError = await service.addUser(dto);

        if (resultOrError.isErr()) {
            return res.status(resultOrError.error.code).send(resultOrError.error);
        }
        return res.status(201).send(UserDto.fromUser(resultOrError.value));
    }

    static async getUserById(req: any, res: any) {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).send({ message: "Invalid user ID" });
        }

        const resultOrError = await service.getUserById(id);

        if (resultOrError.isErr()) {
            return res.status(resultOrError.error.code).send(resultOrError.error);
        }
        return res.status(200).send(UserDto.fromUser(resultOrError.value));
    }
}