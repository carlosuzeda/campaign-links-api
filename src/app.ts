import express from "express";
import cors from "cors";
import { routes } from "./routes/routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import { setupSwagger } from "./lib/swagger";

export const app = express();

app.use(cors());
app.use(express.json());

setupSwagger(app);

app.use(routes);
app.use(errorMiddleware);
