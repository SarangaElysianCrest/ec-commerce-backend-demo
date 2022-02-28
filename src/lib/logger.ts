// import Debug from "debug";

// export function createLogger(namespace: string) : Debug.Debugger {
//   return Debug(namespace)
// }

import winston from "winston";

function createLogger() {
  const logger = winston.createLogger({
    transports: [
      new winston.transports.File({ filename: "log/error.log", level: "error" }),
      new winston.transports.File({ filename: "log/combined.log" })
    ]
  });

  if (process.env.NODE_ENV !== "production") {
    logger.add(
      new winston.transports.Console({
        format: winston.format.simple()
      })
    );
  }

  logger.info("initiating logger");

  return logger;
}

let logger: winston.Logger | null = null;

export function getLogger(): winston.Logger {
  return logger!;
}

export function initLogger(): Promise<winston.Logger> {
  return new Promise((resolve, reject) => {
    logger = createLogger();
    return resolve(logger);
  });
}


export default logger;
