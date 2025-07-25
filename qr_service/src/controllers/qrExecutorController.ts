import { container } from "tsyringe";
import QrExecutorService from "../services/QrExecutorService";
import QrCode from "../dto/qrExecutor/QrCode";

const service = container.resolve(QrExecutorService);

export default class QrExecutorController {
    static async executeQr(req: any, res: any) {
        const dto = QrCode.fromAny(req.body);
        const result = dto.isValid();
        if (result.isErr()) {
            return res.status(result.error.code).send(result.error);
        }
        if (!dto.qr) {
            return res.status(400).send({ code: 400, message: "QR code is required" });
        }

        let resultOrError = await service.executeQrCode(dto.qr);
        if (resultOrError.isErr()) {
            return res.status(resultOrError.error.code).send(resultOrError.error);
        }
        return res.status(200).send(resultOrError.value);
    }
}