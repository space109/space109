const fs = require("fs");
const path = require("path");
const { createLogger, transports, format } = require("winston");
const { combine, timestamp, printf, label, json, simple, colorize } = format;

const printfFormat = {
  file: printf(({ timestamp, label, level, message }) => {
    return `${timestamp} [${label}] ${level} : ${message}`;
  }),
  console: printf(({ timestamp, label, level, message }) => {
    return `${timestamp} ${level} : ${message}`;
  }),
};

const timestampFormat = format.timestamp({
  format: "YYYY-MM-DD HH:mm:dd",
});

const printLogFormat = {
  file: combine(
    label({
      label: "space109",
    }),
    timestampFormat,
    printfFormat.file
  ),
  console: combine(colorize(), timestampFormat, printfFormat.console),
};

const opts = {
  file: new transports.File({
    filename: path.join("/", "tmp", "space109", "log", "log.log"),
    level: "http",
    format: printLogFormat.file,
  }),
  console: new transports.Console({
    level: "debug",
    format: printLogFormat.console,
  }),
};

const logger = createLogger({
  transports: [opts.file],
});

if (process.env.DB_HOST !== "localhost") {
  logger.add(opts.console);
}

logger.stream = {
  write: (message) => logger.info(message),
};

module.exports = logger;
