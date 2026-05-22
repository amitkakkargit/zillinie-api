import dotenv from "dotenv";

dotenv.config();

const config = {
  port: Number(process.env.PORT ?? 4000),
  frontendUrl: process.env.FRONTEND_URL ?? "http://localhost:5173",
  db: {
    user: process.env.DB_USER ?? "sa",
    password: process.env.DB_PASSWORD ?? "",
    server: process.env.DB_SERVER ?? "localhost",
    database: process.env.DB_NAME ?? "ZilliniePortal",
    options: {
      encrypt: false,
      trustServerCertificate: true,
      enableArithAbort: true,
    },
  },
};

export default config;
