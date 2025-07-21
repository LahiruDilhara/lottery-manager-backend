import { Result, err, ok } from "neverthrow";
import { Failure } from "../../core/Failure";
import Joi from "joi";
import lResult from "../../model/lResult";

export default class UpdateResultDto {
    date?: Date;
    drawNumber?: number;
    lotteryId?: string;
    checkerId?: string;
    data?: any;

    static fromAny(data: any): UpdateResultDto {
        const dto: UpdateResultDto = Object.assign(new UpdateResultDto(), data);
        return dto;
    }

    isValid(): Result<void, Failure> {
        const schema = Joi.object({
            date: Joi.date(),
            drawNumber: Joi.number(),
            lotteryId: Joi.string(),
            checkerId: Joi.string(),
            data: Joi.object(),
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
            checker: this.checkerId,
            data: this.data
        });
    }
}
