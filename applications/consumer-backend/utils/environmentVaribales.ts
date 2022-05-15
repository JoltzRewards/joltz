export default {
    MONGO_HOST: process.env.MONGO_HOST || '',
    MONGO_PORT: process.env.MONGO_PORT ? Number(process.env.MONGO_PORT) : undefined,
    MONGO_DB: process.env.MONGO_DB || '',
    BASE_URL: process.env.BASE_URL || 'localhost',
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'dev'
   }