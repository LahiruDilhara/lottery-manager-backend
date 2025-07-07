import mongoose from "mongoose";
import Lottery from "./lottery";

type lResultData = {
    numbers: string[],
    symboles: string[],
    specialSymboles: string[],
}

interface lResult extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    date: Date;
    drawNumber: number;
    lottery: Lottery | mongoose.Types.ObjectId;
    data: lResultData;
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
    lottery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lottery",
        required: true,
    },
    data: {
        type: {
            numbers: [{ type: String }],
            symboles: [{ type: String }],
            specialSymboles: [{ type: String }],
        },
        required: true,
    }
});

const lResult = mongoose.model<lResult>("lResult", lResultSchema, "lResult");
export default lResult;