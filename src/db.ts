import sql from "mssql";
import config from "./config.js";

let pool: sql.ConnectionPool | null = null;

export async function getPool(): Promise<sql.ConnectionPool> {
  if (pool && pool.connected) {
    return pool;
  }
  pool = await sql.connect(config.db);
  return pool;
}

export async function executeProcedure(
  name: string,
  inputs: Array<{ name: string; type: any; value: any }> = [],
) {
  const pool = await getPool();
  const request = pool.request();
  for (const input of inputs) {
    request.input(input.name, input.type, input.value);
  }
  return request.execute(name);
}
