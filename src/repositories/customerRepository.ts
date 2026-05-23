import sql from "mssql";
import { getPool } from "../db.js";

export interface CustomerRecord {
  id: number;
  name: string;
  mobile: string;
  email?: string;
}

export async function fetchCustomerList(): Promise<CustomerRecord[]> {
  const pool = await getPool();
  const result = await pool.request().execute("Proc_GetCustomerList");
  const rows = result.recordset ?? [];

  return rows.map((row: any) => ({
    id: Number(row.CustomerId ?? row.Id ?? 0),
    name: String(row.CustomerName ?? row.Name ?? ""),
    mobile: String(row.Mobile ?? row.MobileNumber ?? ""),
    email: row.EmailId ?? row.Email ?? "",
  }));
}
