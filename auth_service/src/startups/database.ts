import c from 'config';
import debug from 'debug';
import { PrismaClient } from '@prisma/client';
import { Client } from "pg";

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

async function testPrismaConnection() {
    const dbUrl = c.get<string>("database.url");
    process.env.DATABASE_URL = dbUrl;


    const prisma = new PrismaClient();

    try {
        await prisma.$connect();
        debug("info")("Prisma connection established successfully.");
    } catch (error) {
        debug("error")("Error establishing Prisma connection:", error);
    } finally {
        await prisma.$disconnect();
    }
}

export default async function connectToDatabase() {
    await ensureDatabaseExists();
    await testPrismaConnection();
}