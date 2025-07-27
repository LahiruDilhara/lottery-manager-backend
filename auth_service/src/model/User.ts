import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    ADMIN = "admin",
    USER = "user"
}

@Entity()
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

    @Column({ nullable: true, default: () => "CURRENT_TIMESTAMP" })
    addedAt?: Date;

    @Column({ default: false })
    blocked?: boolean;

    @Column({ nullable: true })
    lastLogin?: Date;
}