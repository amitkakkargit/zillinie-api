import sql from "mssql";
import { executeProcedure } from "../db.js";

export async function getStaffList() {
  const result = await executeProcedure("Proc_GetStaffList");
  return result.recordset ?? [];
}

export async function saveStaffDetails(details: {
  StaffId?: number;
  StaffName: string;
  Profession: string;
  Mobile: string;
  Branch: string;
  CreatedBy: string;
  Flag: string;
}) {
  const result = await executeProcedure("Proc_SaveStaffDetails", [
    { name: "StaffId", type: sql.Int, value: details.StaffId ?? 0 },
    { name: "TailorName", type: sql.VarChar(250), value: details.StaffName },
    { name: "TailorType", type: sql.VarChar(100), value: details.Profession },
    { name: "Mobile", type: sql.VarChar(50), value: details.Mobile },
    { name: "Remarks", type: sql.VarChar(500), value: details.Branch },
    { name: "CreatedBy", type: sql.VarChar(100), value: details.CreatedBy },
    { name: "Flag", type: sql.VarChar(50), value: details.Flag },
  ]);
  return result.recordset ?? [];
}
