import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import customersRouter from "./routes/customers.js";
import dashboardRouter from "./routes/dashboard.js";
import lookupRouter from "./routes/lookup.js";
import productsRouter from "./routes/products.js";
import ordersRouter from "./routes/orders.js";
import paymentsRouter from "./routes/payments.js";
import staffRouter from "./routes/staff.js";
import statusRouter from "./routes/status.js";
import measurementsRouter from "./routes/measurements.js";

dotenv.config();

const app = express();
const port = process.env.PORT ?? "4000";

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

import sessionMiddleware from "./middleware/sessionMiddleware.js";

// apply session middleware for API routes (auth and health are allowed through)
app.use("/api", sessionMiddleware);

app.use("/api/auth", authRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/lookups", lookupRouter);
app.use("/api/customers", customersRouter);
app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/payments", paymentsRouter);
app.use("/api/staff", staffRouter);
app.use("/api/measurements", measurementsRouter);
app.use("/api/status", statusRouter);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(Number(port), () => {
  console.log(`Zillinie API running at http://localhost:${port}`);
});
