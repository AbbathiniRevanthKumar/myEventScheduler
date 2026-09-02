import express from "express";
import { v1Router } from "./routes";
import { errorHandler } from "./middleware/errorMiddleware";
import cors from "cors";
import "./events/eventPublisher";

const app = express();
app.use(express.json());
app.use(cors({origin : "*"}));
app.use("/scheduler-service/api/v1", v1Router);

app.use(errorHandler);


export default app;
