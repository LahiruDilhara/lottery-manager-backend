import c from 'config';
import debug from 'debug';
import { Client } from "pg";
import { DataSource } from 'typeorm';
import User from '../model/User';
import { exit } from 'process';
import { container, singleton } from 'tsyringe';

const TARGET_DB = "auth";

const adminClient = new Client({
    host: c.get("database.host"),
    port: c.get<number>("database.port"),
    user: c.get("database.user"),
    password: c.get("database.password"),
    database: "postgres"
});

async function ensureDatabaseExists() {
    await adminClient.connect();

    const res = await adminClient.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [TARGET_DB]);
    if (res.rowCount === 0) {
        debug("info")(`Database ${TARGET_DB} does not exist. Creating...`);
        await adminClient.query(`CREATE DATABASE ${TARGET_DB}`);
        debug("info")(`Database ${TARGET_DB} created successfully.`);
    } else {
        debug("info")(`Database ${TARGET_DB} already exists.`);
    }

    await adminClient.end();
}

@singleton()
export class DatabaseConnection extends DataSource {
    constructor() {
        super({
            type: "postgres",
            host: c.get("database.host"),
            port: c.get<number>("database.port"),
            username: c.get("database.user"),
            password: c.get("database.password"),
            database: TARGET_DB,
            synchronize: true,
            logging: false,
            entities: [User]
        });
    }

    async connectDatabase(): Promise<void> {
        await this.initialize();
        if (!this.isInitialized) {
            debug("error")("Database connection failed to initialize.");
            exit(1);
        }
        debug("info")("ORM Database connection established successfully.");
    }
}



export default async function connectToDatabase() {
    await ensureDatabaseExists();
    await container.resolve(DatabaseConnection).connectDatabase();
}