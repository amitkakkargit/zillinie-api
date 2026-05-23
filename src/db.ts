import sql from "mssql";
import config from "./config.js";

let pool: sql.ConnectionPool | null = null;
let usingMock = false;

class MockRequest {
  inputs: any[] = [];
  input(_name: string, _type: any, _value: any) {
    return this;
  }
  async query(_q: string) {
    console.warn("DB unavailable — returning empty recordset for query");
    return { recordset: [] };
  }
  async execute(_name: string) {
    console.warn("DB unavailable — returning empty recordset for execute");
    return { recordset: [] };
  }
}

class MockPool {
  get connected() {
    return false;
  }
  request() {
    return new MockRequest();
  }
}

export async function getPool(): Promise<sql.ConnectionPool> {
  if (pool && (pool as any).connected) {
    return pool;
  }

  try {
    pool = await sql.connect(config.db);
    usingMock = false;
    return pool;
  } catch (err) {
    console.warn(
      "Could not connect to SQL Server — enabling DB mock fallback:",
      err?.message ?? err,
    );
    pool = new MockPool() as unknown as sql.ConnectionPool;
    usingMock = true;
    return pool;
  }
}

export function isUsingMockDb() {
  return usingMock;
}

export async function executeProcedure(
  name: string,
  inputs: Array<{ name: string; type: any; value: any }> = [],
) {
  const pool = await getPool();
  const request: any = (pool as any).request();
  for (const input of inputs) {
    request.input(input.name, input.type, input.value);
  }
  return request.execute(name);
}
