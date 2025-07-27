import mongoose from "mongoose";

interface Resolver extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    name?: string;
    description?: string;
    pattern: string;
    script: string;
    lotteryCodeId: number;
    addedAt?: Date;
}

export const ResolverSchema = new mongoose.Schema<Resolver>({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    name: {
        type: String,
        trim: true,
        default: null
    },
    description: {
        type: String,
        trim: true,
        default: null
    },
    pattern: {
        type: String,
        required: true,
        validate: {
            validator: (v: string) => {
                try {
                    new RegExp(v);
                    return true;
                } catch (e) {
                    return false;
                }
            },
            message: props => `${props.value} is not a valid regular expression!`
        }
    },
    script: {
        type: String,
        required: true,
    },
    lotteryCodeId: {
        type: Number,
        required: true,
    },
    addedAt: {
        type: Date,
        default: Date.now,
    },
});


const Resolver = mongoose.model<Resolver>("Resolver", ResolverSchema, "Resolver");
export default Resolver;