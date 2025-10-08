import { app } from "./app";
import { config } from "./config/env.config";
import connectDB from "./config/db.config";

const startServer = () => {
  const PORT = config.port || 8000;
  app.listen(PORT, () => {
    console.log(`Server is listening on PORT:${PORT}`);
  });
};

connectDB()
  .then(() => {
    startServer();
  })
  .catch((err) => {
    console.log(`Startup Error: ${err}`);
  });
