import mongoose from "mongoose";
import Lottery from "./lottery";
import ResultChecker from "./resultChecker";


interface lResult extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    date: Date;
    drawNumber: number;
    lotteryCodeId: number;
    checker: ResultChecker | mongoose.Types.ObjectId | null;
    data: any;
}

const lResultSchema = new mongoose.Schema<lResult>({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    date: {
        type: Date,
        required: true,
    },
    drawNumber: {
        type: Number,
        required: true,
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
    checker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ResultChecker",
        required: false,
        default: null,
    },
    data: {
        type: Object,
        required: true,
    }
});

const lResult = mongoose.model<lResult>("lResult", lResultSchema, "lResult");
export default lResult;