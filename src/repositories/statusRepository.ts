import sql from "mssql";
import { executeProcedure } from "../db.js";

export async function getProductStatus(orderNumber = "") {
  const result = await executeProcedure("Proc_GetProductStatus", [
    { name: "OrderNumber", type: sql.VarChar(100), value: orderNumber },
  ]);
  return result.recordset ?? [];
}

export async function updateProductStatus(details: {
  ProductId: number;
  StatusId: number;
  Remarks?: string;
  StaffId: number;
  CreatedBy: string;
}) {
  const result = await executeProcedure("Proc_UpdateProductStatus", [
    { name: "ProductId", type: sql.Int, value: details.ProductId },
    { name: "StatusId", type: sql.Int, value: details.StatusId },
    { name: "Remarks", type: sql.VarChar(500), value: details.Remarks ?? "" },
    { name: "StaffId", type: sql.Int, value: details.StaffId },
    { name: "CreatedBy", type: sql.VarChar(100), value: details.CreatedBy },
  ]);

  return result.recordset ?? [];
}
