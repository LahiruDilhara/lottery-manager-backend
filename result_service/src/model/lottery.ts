import mongoose from "mongoose";

interface Lottery extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    addedAt?: Date;
}

export const LotterySchema = new mongoose.Schema<Lottery>({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    addedAt: {
        type: Date,
        default: Date.now,
    },
});


const Lottery = mongoose.model<Lottery>("Lottery", LotterySchema, "Lottery");
export default Lottery;