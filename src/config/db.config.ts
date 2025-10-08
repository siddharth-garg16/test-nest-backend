import mongoose from "mongoose";
import { config } from "./env.config";

const connectDB = async () => {
  try {
    const mongodbConnectionMetadata = await mongoose.connect(
      `${config.dbConnectionString}`
    );
    console.log(
      "DB connected: ",
      mongodbConnectionMetadata.connection.host,
      mongodbConnectionMetadata.connection.name
    );
  } catch (err) {
    console.log(`DB Connection Error: ${err}`);
    process.exit(1);
  }
};

export default connectDB;
