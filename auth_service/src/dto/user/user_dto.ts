import User from "../../model/User";

export default class UserDto {
    id!: number;
    name!: string;
    description?: string;
    role!: string;
    addedAt?: Date | null;
    blocked?: boolean;
    lastLogin?: Date | null;
    canRestorePassword?: boolean;

    static fromUser(user: User): UserDto {
        const dto = new UserDto();
        dto.id = user.id;
        dto.name = user.name;
        dto.description = user.description;
        dto.role = user.role;
        dto.addedAt = user.addedAt;
        dto.blocked = user.blocked;
        dto.lastLogin = user.lastLogin;
        dto.canRestorePassword = user.canRestorePassword;
        return dto;
    }
}