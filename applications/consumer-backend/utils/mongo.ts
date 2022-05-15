import mongoose from 'mongoose';
import winston from './logger/winston';
import env from '../utils/environmentVaribales';

/**
 * initialise mongoDB connection
 */
const init = () => {

  /* connect */
  mongoose.connect(
    `mongodb://${env.MONGO_HOST}:${env.MONGO_PORT}/${env.MONGO_DB}`,
    (err) => {
      if (err) {
        winston.error(`Error while connecting to MongoDB: ${err}`);
        return process.exit(0);
      }
      winston.debug('Connected to MongoDB');

    /* close mongo connection on SIGINT */
      mongoose.connection.on('error', err => winston.error(`MongoDB error: ${err}`));
      process.on('SIGINT', () => {
        mongoose.connection.close(() => {
          return process.exit(0);
        });
      });
    },
  );
};

export default {
  init,
};