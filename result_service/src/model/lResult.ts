import mongoose from "mongoose";
import Lottery from "./lottery";
import ResultChecker from "./resultChecker";


interface lResult extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    date: Date;
    drawNumber: number;
    lottery: Lottery | mongoose.Types.ObjectId;
    checker: ResultChecker | mongoose.Types.ObjectId;
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
    lottery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lottery",
        required: true,
    },
    checker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ResultChecker",
        required: true,
    },
    data: {
        type: Object,
        required: true,
    }
});

const lResult = mongoose.model<lResult>("lResult", lResultSchema, "lResult");
export default lResult;