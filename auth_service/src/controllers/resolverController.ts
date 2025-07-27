import { container } from "tsyringe";
import ResolverService from "../services/resolverService";
import AddresolverDto from "../dto/resolver/addResolverDto";
import UpdateResolverDto from "../dto/resolver/updateResolverDto";
import EventBus from "../core/EventBus";

const service = container.resolve(ResolverService);

export default class ResolverController {
    static async addResolver(req: any, res: any) {
        const dto = AddresolverDto.fromAny(req.body);
        const result = dto.isValid();

        if (result.isErr()) {
            return res.status(result.error.code).send(result.error);
        }

        let resultOrError = await service.addResolver(dto.toModel());

        if (resultOrError.isErr()) {
            return res.status(resultOrError.error.code).send(resultOrError.error);
        }
        EventBus.emit("loadCache");
        return res.status(201).send(resultOrError.value);
    }

    static async updateResolverById(req: any, res: any) {
        const dto = UpdateResolverDto.fromAny(req.body);
        const result = dto.isValid();
        if (result.isErr()) {
            return res.status(result.error.code).send(result.error);
        }
        if (!req.params.id) {
            return res.status(400).send({ code: 400, message: "Resolver ID is required" });
        }
        const resolverId = req.params.id;

        let resultOrError = await service.updateResolverById(resolverId, dto.toModel(resolverId));

        if (resultOrError.isErr()) {
            return res.status(resultOrError.error.code).send(resultOrError.error);
        }
        EventBus.emit("loadCache");
        return res.status(200).send(resultOrError.value);
    }

    static async getResolversByLotteryCodeId(req: any, res: any) {
        const lotteryCodeId = parseInt(req.params.lotteryCodeId, 10);
        if (isNaN(lotteryCodeId)) {
            return res.status(400).send({ code: 400, message: "Invalid lottery code ID" });
        }
        let resultOrError = await service.getResolversByLotteryCodeId(lotteryCodeId);

        if (resultOrError.isErr()) {
            return res.status(resultOrError.error.code).send(resultOrError.error);
        }
        return res.status(200).send(resultOrError.value);
    }

    static async getAllResolvers(req: any, res: any) {
        let resultOrError = await service.getAllResolvers();

        if (resultOrError.isErr()) {
            return res.status(resultOrError.error.code).send(resultOrError.error);
        }
        return res.status(200).send(resultOrError.value);
    }

    static async deleteResolverById(req: any, res: any) {
        const id = req.params.id;
        if (!id) {
            return res.status(400).send({ code: 400, message: "Resolver ID is required" });
        }
        let resultOrError = await service.deleteResolverById(id);

        if (resultOrError.isErr()) {
            return res.status(resultOrError.error.code).send(resultOrError.error);
        }
        EventBus.emit("loadCache");
        return res.status(200).send(resultOrError.value);
    }
}