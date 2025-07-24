import mongoose from "mongoose";
import Lottery from "./lottery";

interface ResultChecker extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    description: string;
    lotteryCodeId: Number;
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
    lotteryCodeId: {
        type: Number,
        required: true,
        validate: {
            validator: async function (value: number) {
                const exists = await Lottery.exists({ codeId: value });
                return !!exists;
            },
            message: (props: any) => `Lottery with codeId ${props.value} does not exist`
        }
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