import { Result, err, ok } from "neverthrow";
import { Failure } from "../../core/Failure";
import Joi from "joi";
import lResult from "../../model/lResult";
import { Types } from "mongoose";

export default class UpdateResultDto {
    date?: Date;
    drawNumber?: number;
    lotteryCodeId?: number;
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
            lotteryCodeId: Joi.number(),
            checkerId: Joi.string(),
            data: Joi.object(),
        });
        const { error } = schema.validate(this);
        if (error) {
            return err(Failure.fromJoiError(error, 400));
        }
        return ok(undefined);
    }

    toModel(resultId: string): lResult {
        return new lResult({
            _id: new Types.ObjectId(resultId),
            date: this.date,
            drawNumber: this.drawNumber,
            lotteryCodeId: this.lotteryCodeId,
            checker: this.checkerId,
            data: this.data
        });
    }
}
