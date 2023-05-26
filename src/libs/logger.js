const Level = Object.freeze({
    DEBUG: 'DEBUG',
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR',
});

function print(name, level, ...args) {
    if (!process.env.LOGGER) {
        return;
    }
    //process.stdout.write(view + ": " + text2log + "\n");
    console.log(`[${name}] [${level}]`, ...args);
}

const Logger = name => ({
    debug(...args) {
        if(process.env.LOG_LEVEL !== Level.DEBUG) {
            return;
        }
        print(name, Level.DEBUG, ...args);
    },
    info(...args) {
        print(name, Level.INFO, ...args);
    },
    warn(...args) {
        print(name, Level.WARN, ...args);
    },
    error(...args) {
        // quí se puede generar una notificación
        print(name, Level.ERROR, ...args);
    },
});

module.exports = Logger;
