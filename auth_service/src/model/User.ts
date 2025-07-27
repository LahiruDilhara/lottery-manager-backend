import mongoose from "mongoose";

interface User extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    description?: string;
    role: string;
    password: string;
    addedAt?: Date;
    blocked?: boolean;
    lastLogin?: Date;
}

export const UserSchema = new mongoose.Schema<User>({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    name: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        default: null
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    addedAt: {
        type: Date,
        default: Date.now,
    },
    blocked: {
        type: Boolean,
        default: false,
    },
    lastLogin: {
        type: Date,
        default: null,
    },
});


const User = mongoose.model<User>("User", UserSchema, "User");
export default User;