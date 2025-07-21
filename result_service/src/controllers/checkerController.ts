import { Request, Response } from "express";
import AddCheckerDto from "../dto/checker/addCheckerDto";
import CheckerService from "../services/checkerService";
import { container } from "tsyringe";
import UpdateCheckerDto from "../dto/checker/updateCheckerDto";

const service = container.resolve(CheckerService);

export class CheckerController {
    static async getAllCheckers(req: any, res: any) {
        let checkersOrError = await service.getAllCheckers();
        if (checkersOrError.isErr()) {
            return res.status(checkersOrError.error.code).send(checkersOrError.error);
        }
        return res.status(200).send(checkersOrError.value);
    }

    static async createChecker(req: any, res: any) {
        const dto = AddCheckerDto.fromAny(req.body); // Assuming the body contains the checker data
        const validity = dto.isValid();

        if (validity.isErr()) {
            return res.status(validity.error.code).send(validity.error);
        }

        let checkerOrError = await service.addChecker(dto);

        if (checkerOrError.isErr()) {
            return res.status(checkerOrError.error.code).send(checkerOrError.error);
        }
        return res.status(201).send(checkerOrError.value);
    }

    static async getCheckerById(req: any, res: any) {
        const id = req.params.id;
        let checkerOrError = await service.getCheckerById(id);

        if (checkerOrError.isErr()) {
            return res.status(checkerOrError.error.code).send(checkerOrError.error);
        }
        return res.status(200).send(checkerOrError.value);
    }

    static async getCheckerByLotteryId(req: Request, res: Response) {
        const id = req.params.lotteryId;
        let checkerOrError = await service.getCheckersByLotteryId(id);

        if (checkerOrError.isErr()) {
            return res.status(checkerOrError.error.code).send(checkerOrError.error);
        }
        return res.status(200).send(checkerOrError.value);
    }

    static async deleteCheckerById(req: any, res: any) {
        const id = req.params.id;
        let checkerOrError = await service.deleteCheckerById(id);

        if (checkerOrError.isErr()) {
            return res.status(checkerOrError.error.code).send(checkerOrError.error);
        }
        return res.status(200).send(checkerOrError.value);
    }

    static async updateCheckerById(req: any, res: any) {
        const id = req.params.id;
        const dto = UpdateCheckerDto.fromAny(req.body); // Assuming the body contains the updated checker data
        const validity = dto.isValid();

        if (validity.isErr()) {
            return res.status(validity.error.code).send(validity.error);
        }

        let checkerOrError = await service.updateCheckerById(id, dto.toModel(id));

        if (checkerOrError.isErr()) {
            return res.status(checkerOrError.error.code).send(checkerOrError.error);
        }
        return res.status(200).send(checkerOrError.value);
    }
}