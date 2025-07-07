import { Result, err, ok } from "neverthrow";
import { Failure } from "../../core/Failure";
import Joi from "joi";
import lResult from "../../model/lResult";

export default class AddResultDto {
    date?: Date;
    drawNumber?: number;
    lotteryId?: string;
    numbers?: string[];
    symboles?: string[] = [];
    specialSymboles?: string[] = [];

    static fromAny(data: any): AddResultDto {
        const dto: AddResultDto = Object.assign(new AddResultDto(), data);
        return dto;
    }

    isValid(): Result<void, Failure> {
        const schema = Joi.object({
            date: Joi.date().required(),
            drawNumber: Joi.number().required(),
            lotteryId: Joi.string().required(),
            numbers: Joi.array().items(Joi.string()),
            symboles: Joi.array().items(Joi.string()),
            specialSymboles: Joi.array().items(Joi.string()),
        });
        const { error } = schema.validate(this);
        if (error) {
            return err(Failure.fromJoiError(error, 400));
        }
        return ok(undefined);
    }

    toModel(): lResult {
        return new lResult({
            date: this.date,
            drawNumber: this.drawNumber,
            lottery: this.lotteryId,
            data: {
                numbers: this.numbers,
                symboles: this.symboles,
                specialSymboles: this.specialSymboles
            }
        });
    }
}
