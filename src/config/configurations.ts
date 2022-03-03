export default () => ({
  env: process.env.NODE_ENV || 'development',
  port: 3000,
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  logger: {
    level: process.env.LOGGER_LEVEL || 'debug',
    log: {
      requests: process.env.LOGGER_LOG_REQUESTS === 'true', // set false to disable the automatic "request completed" and "request errored" logging (it's very verbose)
      queries: process.env.LOGGER_LOG_QUERIES === 'true', // true to enable mikro orm logging (requires logger level to be 'debug')
    },
  },
});
