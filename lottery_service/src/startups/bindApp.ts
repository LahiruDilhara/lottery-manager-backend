import { Application } from "express";
import c from "config";
import debug from "debug";

const HOST = "0.0.0.0";

export default function bindNetwork(app: Application) {
    try {
        let applicationPort = parseInt(c.get("port")) || 4050;
        app.listen(applicationPort, HOST, () => {
            debug("info")(`Server is running on http://${HOST}:${applicationPort}`);
        });
    }
    catch (e) {
        debug("error")("Failed to bind network", e);
        process.exit(1);
    }
    debug("info")("Network binding completed");
}