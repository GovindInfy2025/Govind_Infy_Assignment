const ENVIRONMENTS = {
  development: ["debug", "info", "warn", "error"],
  staging: ["info", "warn", "error"],
  production: ["warn", "error"],
};

const currentEnv = process.env.REACT_APP_ENV || "development";
const allowedLevels = ENVIRONMENTS[currentEnv] || ["warn", "error"];

const Logger = {
  debug: (message, ...args) => {
    if (allowedLevels.includes("debug")) {
      console.debug(`[DEBUG]:${message}`, ...args);
    }
  },
  info: (message, ...args) => {
    if (allowedLevels.includes("info")) {
      console.info(`[INFO]:${message}`, ...args);
    }
  },
  warn: (message, ...args) => {
    if (allowedLevels.includes("warn")) {
      console.warn(`[WARN]:${message}`, ...args);
    }
  },
  error: (message, ...args) => {
    if (allowedLevels.includes("error")) {
      console.error(`[ERROR]:${message}`, ...args);
    }
  },
};
export default Logger;
