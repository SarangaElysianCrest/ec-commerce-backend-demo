function parseEnvVariable(key, defaultValue) {
    if (process.env[key]) return process.env[key];
    return `${defaultValue}`;
}

function parseEnvString(key, defaultValue) {
    return parseEnvVariable(key, defaultValue);
}

function parseEnvInt(key, defaultValue) {
    const val = parseEnvVariable(key, defaultValue);
    return parseInt(val, 10);
}

function parseEnvFloat(key, defaultValue) {
    const val = parseEnvVariable(key, defaultValue);
    return parseFloat(val);
}

function parseEnvBoolean(key, defaultValue) {
    const val = parseEnvVariable(key, defaultValue);
    switch (val.toLowerCase()) {
        case 'true':
        case '1':
            return true;
        case 'false':
        case '0':
            return false;
    }
    return defaultValue;
}

exports.dbHost = parseEnvString('DB_HOST');
exports.dbPort = parseEnvInt('DB_PORT');
exports.dbUser = parseEnvString('DB_USER');
exports.dbPass = parseEnvString('DB_PASS');
exports.dbName = parseEnvString('DB_NAME');
exports.dbType = parseEnvString('DB_TYPE');
exports.dbLog = parseEnvBoolean('DB_LOH');
exports.appHost = parseEnvString('APP_HOST');
exports.appPort = parseEnvInt('APP_PORT');
