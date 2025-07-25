import { Result, err, ok } from "neverthrow";
import { Failure } from "../../core/Failure";
import Joi from "joi";

export default class QrCode {
    qr?: string;

    static fromAny(data: any): QrCode {
        const dto: QrCode = Object.assign(new QrCode(), data);
        return dto;
    }

    isValid(): Result<void, Failure> {
        const schema = Joi.object({
            qr: Joi.string().max(1500).required(),
        });
        const { error } = schema.validate(this);
        if (error) {
            return err(Failure.fromJoiError(error, 400));
        }
        return ok(undefined);
    }
}
