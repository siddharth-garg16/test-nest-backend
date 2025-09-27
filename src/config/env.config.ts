// native support in node20+ for env files
process.loadEnvFile(".env");

const _config = {
  port: process.env.PORT,
};

export const config = Object.freeze(_config);
