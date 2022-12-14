import "dotenv/config";
import mongoose from "mongoose";
import { redisClient } from "./utils";
import app from "./app";

const port = process.env.SERVER_PORT;
const mongoDB = process.env.MONGODB_URI as string;

mongoose.set("strictQuery", true); // strictQuery가 뭘까...
mongoose.connect(mongoDB);
mongoose.connection.on("connected", () => console.log("mongoDB connected"));

redisClient.connect();
redisClient.on("connect", () => console.log("redis connected"));

app.listen(port, () => console.log(`server started on ${port}`));
