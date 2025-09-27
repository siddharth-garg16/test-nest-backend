import { app } from "./app";
import { config } from "./config/env.config";

const startServer = () => {
  const PORT = config.port || 8000;
  app.listen(PORT, () => {
    console.log(`Server is listening on PORT:${PORT}`);
  });
};

startServer();
