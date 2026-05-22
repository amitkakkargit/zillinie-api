import sql from "mssql";
import { executeProcedure } from "../db.js";

export async function getCategories() {
  const result = await executeProcedure("Proc_GetCategory");
  return result.recordset ?? [];
}

export async function getSubcategories(categoryId: number) {
  const result = await executeProcedure("Proc_GetSubCategory", [
    { name: "categoryId", type: sql.Int, value: categoryId },
  ]);
  return result.recordset ?? [];
}

export async function getProductTypes() {
  const result = await executeProcedure("Proc_GetProductType");
  return result.recordset ?? [];
}

export async function getUnits() {
  const result = await executeProcedure("Proc_GetUnit");
  return result.recordset ?? [];
}

export async function getStatusTypes() {
  const result = await executeProcedure("Proc_GetStatus");
  return result.recordset ?? [];
}

export async function getProfessions() {
  const result = await executeProcedure("Proc_GetStaffProfession");
  return result.recordset ?? [];
}

export async function getBranches() {
  const result = await executeProcedure("Proc_GetBranchName");
  return result.recordset ?? [];
}
