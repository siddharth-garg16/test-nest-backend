import { app } from "./app";
import { config } from "./config/env.config";
import connectDB from "./config/db.config";
import { seedAdmin } from "./utils/seed";

const startServer = () => {
    const PORT = config.port || 8000;
    app.listen(PORT, () => {
        console.log(`Server is listening on PORT:${PORT}`);
    });
};

connectDB()
    .then(async () => {
        await seedAdmin(config.adminEmail, config.adminPassword);
        startServer();
    })
    .catch((err) => {
        console.log(`Startup Error: ${err}`);
    });
