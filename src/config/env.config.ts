// native support in node20+ for env files
process.loadEnvFile(".env");

const _config = {
  port: process?.env?.PORT,
  dbConnectionString: process?.env?.DB_CONNECTION_STRING,
  // jwtSecret: process?.env?.JWT_SECRET,
  accessTokenSecret: process?.env?.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process?.env?.REFRESH_TOKEN_SECRET,
};

export const config = Object.freeze(_config);
