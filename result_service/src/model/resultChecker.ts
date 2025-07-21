import mongoose from "mongoose";
import Lottery from "./lottery";

interface ResultChecker extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    description: string;
    lottery: Lottery | mongoose.Types.ObjectId;
    addedAt?: Date;
    script: string;
}

export const ResultCheckerSchema = new mongoose.Schema<ResultChecker>({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    description: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    lottery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lottery",
        required: true,
    },
    addedAt: {
        type: Date,
        default: Date.now,
    },
    script: {
        type: String,
        required: true,
    },
});

const ResultChecker = mongoose.model<ResultChecker>("ResultChecker", ResultCheckerSchema, "ResultChecker");
export default ResultChecker;