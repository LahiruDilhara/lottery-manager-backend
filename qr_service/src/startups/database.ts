import c from 'config';
import debug from 'debug';
import mongoose from 'mongoose';

export default async function connectToDatabase() {
    try {
        await mongoose.connect(c.get("database.connectionString"))
    }
    catch (e) {
        debug("error")("Failed to connect to database", e);
    }
    debug("info")("Connected to database");
}