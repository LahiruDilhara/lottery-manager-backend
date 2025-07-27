import c from 'config';
import debug from 'debug';

export default function validateConfig() {
    if (!c.get("port")) {
        debug("error")("Port is not defined in the configuration");
        process.exit(1);
    }
    if (!c.get("database.url")) {
        debug("error")("Database URL is not defined in the configuration");
        process.exit(1);
    }
    if (!c.get("database.host")) {
        debug("error")("Database host is not defined in the configuration");
        process.exit(1);
    }
    if (!c.get("database.port")) {
        debug("error")("Database port is not defined in the configuration");
        process.exit(1);
    }
    if (!c.get("database.user")) {
        debug("error")("Database user is not defined in the configuration");
        process.exit(1);
    }
    if (!c.get("database.password")) {
        debug("error")("Database password is not defined in the configuration");
        process.exit(1);
    }
    if (!c.get("jwtSecret")) {
        debug("error")("JWT Secret is not defined in the configuration");
        process.exit(1);
    }
    if (!c.get("jwtExpiration")) {
        debug("error")("JWT Expiration is not defined in the configuration");
        process.exit(1);
    }
    debug("info")("Configuration validation passed");
    return true;
}