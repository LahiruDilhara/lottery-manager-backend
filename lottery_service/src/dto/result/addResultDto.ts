import { Result, err, ok } from "neverthrow";
import { Failure } from "../../core/Failure";
import Joi from "joi";
import lResult from "../../model/lResult";

export default class AddResultDto {
    date?: Date;
    drawNumber?: number;
    lotteryCodeId?: number;
    checkerId?: string;
    data?: any;

    static fromAny(data: any): AddResultDto {
        const dto: AddResultDto = Object.assign(new AddResultDto(), data);
        return dto;
    }

    isValid(): Result<void, Failure> {
        const schema = Joi.object({
            date: Joi.date().required(),
            drawNumber: Joi.number().required(),
            lotteryCodeId: Joi.number().required(),
            checkerId: Joi.string().optional(),
            data: Joi.object().required(),
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
            lotteryCodeId: this.lotteryCodeId,
            checker: this.checkerId,
            data: this.data
        });
    }
}
