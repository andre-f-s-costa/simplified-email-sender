import consumeMessageService from "./services/processor.js";
import express from "express";
import router from "./routes/router.js";
import './routes/MailRouter.js';
import cors from "cors";
import { config } from "dotenv";
import logger from "./middlewares/logger.js";
import "./database/dbConnection.js";

config();

const runner = express();

runner.use(express.json());
runner.use(express.urlencoded({ extended: true }));

runner.use(cors({
    origin: process.env.ORIGIN
}));

runner.use(logger);

runner.use(router);

let port: number = process.env.PORT?Number(process.env.PORT):3000;

runner.listen(port, async ():Promise<void> => {
    console.log(`Running on port ${port}`);
    await consumeMessageService();
});