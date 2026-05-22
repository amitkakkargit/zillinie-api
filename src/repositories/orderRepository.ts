import sql from "mssql";
import { executeProcedure } from "../db.js";

export async function getOrderList(searchTerm = "") {
  const result = await executeProcedure("Proc_GetProductDetailsCustomerWise", [
    { name: "SearchTerm", type: sql.VarChar(250), value: searchTerm },
    { name: "TrialDate", type: sql.VarChar(50), value: "" },
    { name: "DeliveryDate", type: sql.VarChar(50), value: "" },
  ]);
  return result.recordset ?? [];
}

export async function getOrderByNumber(orderNumber: string) {
  const result = await executeProcedure("Proc_GetProductListByOrderNumber", [
    { name: "OrderNumber", type: sql.VarChar(100), value: orderNumber },
  ]);
  return result.recordset ?? [];
}
