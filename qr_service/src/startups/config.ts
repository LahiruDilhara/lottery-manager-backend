import c from 'config';
import debug from 'debug';

export default function validateConfig() {
    if (!c.get("port")) {
        debug("error")("Port is not defined in the configuration");
        process.exit(1);
    }
    if (!c.get("database.connectionString")) {
        debug("error")("Database connection string is not defined in the configuration");
        process.exit(1);
    }
}