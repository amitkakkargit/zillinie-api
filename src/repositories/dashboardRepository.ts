import sql from "mssql";
import { executeProcedure } from "../db.js";

export async function getDashboardStatusWise(createdBy?: string) {
  const result = await executeProcedure("Proc_GetDashboardStatusWise", [
    { name: "CreatedBy", type: sql.VarChar(100), value: createdBy ?? "" },
  ]);

  const recordsets = Array.isArray(result.recordsets)
    ? result.recordsets
    : Object.values(result.recordsets);

  return {
    summary: recordsets[0] ?? [],
    details: recordsets[1] ?? [],
  };
}
