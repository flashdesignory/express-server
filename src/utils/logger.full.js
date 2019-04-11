import path from 'path';
import { createLogger, format, transports } from 'winston';

const {
  combine, timestamp, printf,
} = format;

const myFormat = printf(info => `${info.timestamp} [${info.level}] - ${info.message}`);

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    myFormat,
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp(),
        format.colorize(),
        myFormat,
      ),
    }),
    new transports.File({
      filename: path.join(__dirname, '../../logs', 'server.log'),
    }),
  ],
});

export default logger;
