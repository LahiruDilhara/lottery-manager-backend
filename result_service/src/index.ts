import express, { Application } from "express";
import validateConfig from "./startups/config";
import connectToDatabase from "./startups/database";
import configMiddlewareAndRoutes from "./startups/route";
import bindNetwork from "./startups/bindApp";
import debug from "debug";

async function main() {
    const app: Application = express();

    // enable the debug library info and error without adding system environment variables
    debug.enable("info,error");

    validateConfig();
    await connectToDatabase();
    configMiddlewareAndRoutes(app);
    bindNetwork(app);
}
main();