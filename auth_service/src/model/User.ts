import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    ADMIN = "admin",
    USER = "user"
}

@Entity("auth_users")
export default class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    name!: string;

    @Column({ nullable: true })
    description?: string;

    @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
    role!: UserRole;

    @Column()
    password!: string;

    @Column({ type: "timestamp", nullable: true, default: () => "CURRENT_TIMESTAMP" })
    addedAt?: Date | null;

    @Column({ type: "boolean", default: false })
    blocked?: boolean;

    @Column({ type: "timestamp", nullable: true })
    lastLogin?: Date | null;

    @Column({ type: "boolean", nullable: true, default: false })
    canRestorePassword?: boolean;
}