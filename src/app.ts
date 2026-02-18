import express from "express";
import healthRoutes from "./api/v1/routes/healthRoutes";

const app = express();

app.use(express.json());

app.use("/api/v1", healthRoutes);

export default app;
