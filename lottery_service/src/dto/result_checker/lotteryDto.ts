import { err, ok, Result } from "neverthrow";
import { Failure } from "../../core/Failure";
import Joi from "joi";

export default class LotteryDto {
    lotteryCodeId?: number;
    drawNumber?: number;
    date?: Date;
    data: any;


    static fromAny(data: any): LotteryDto {
        const dto: LotteryDto = Object.assign(new LotteryDto(), data);
        return dto;
    }

    isValid(): Result<void, Failure> {
        const schema = Joi.object({
            lotteryCodeId: Joi.number().required(),
            drawNumber: Joi.number().required(),
            date: Joi.date().required(),
            data: Joi.object().required(),
        });
        const { error } = schema.validate(this);
        if (error) {
            return err(Failure.fromJoiError(error, 400));
        }
        return ok(undefined);
    }
}