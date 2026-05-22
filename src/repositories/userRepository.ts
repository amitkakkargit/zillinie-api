import sql from "mssql";
import config from "../config.js";

export interface UserRecord {
  id: number;
  username: string;
  name: string;
}

export async function findUserByCredentials(
  username: string,
  password: string,
): Promise<UserRecord | null> {
  const pool = await sql.connect(config.db);
  const result = await pool
    .request()
    .input("Username", sql.VarChar(100), username)
    .input("Password", sql.VarChar(100), password)
    .execute("Proc_ValidateUser");

  const row = result.recordset?.[0];
  if (!row) {
    return null;
  }

  return {
    id: Number(row.UserId ?? row.Id ?? 0),
    username: String(row.Username ?? row.UserName ?? ""),
    name: String(
      row.Name ?? row.DisplayName ?? row.Username ?? row.UserName ?? "",
    ),
  };
}
