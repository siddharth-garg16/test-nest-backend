// native support in node20+ for env files
process.loadEnvFile(".env");

const _config = {
  port: process?.env?.PORT,
  dbConnectionString: process?.env?.DB_CONNECTION_STRING,
};

export const config = Object.freeze(_config);
