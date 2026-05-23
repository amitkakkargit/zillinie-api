import sql from "mssql";
import { executeProcedure, isUsingMockDb } from "../db.js";

export interface UserRecord {
  id: number;
  username: string;
  name: string;
}

export async function findUserByCredentials(
  username: string,
  password: string,
): Promise<UserRecord | null> {
  // Use stored procedure via executeProcedure; falls back to mock when DB unavailable
  const result = await executeProcedure("Proc_ValidateUser", [
    { name: "Username", type: sql.VarChar(100), value: username },
    { name: "Password", type: sql.VarChar(100), value: password },
  ]);

  const row = result.recordset?.[0];
  if (!row) {
    if (isUsingMockDb()) {
      // return a fake user in dev mode so login flows can be exercised
      return { id: 1, username, name: username };
    }
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
