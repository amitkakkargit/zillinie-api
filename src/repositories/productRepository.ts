import sql from "mssql";
import { executeProcedure } from "../db.js";

export async function getProducts() {
  const result = await executeProcedure("Proc_GetProducts");
  return result.recordset ?? [];
}

export async function saveProduct(details: {
  SubcategoryID: number;
  ProductName: string;
  Unit: string;
  PurchaseRate: number;
  SaleRate: number;
  NewStock: number;
  Remarks?: string;
  ProductID?: number;
  dbQrPath?: string;
}) {
  const result = await executeProcedure("Proc_SaveProductDetails", [
    { name: "SubcategoryID", type: sql.Int, value: details.SubcategoryID },
    { name: "ProductName", type: sql.VarChar(250), value: details.ProductName },
    { name: "Unit", type: sql.VarChar(50), value: details.Unit },
    {
      name: "PurchaseRate",
      type: sql.Decimal(18, 2),
      value: details.PurchaseRate,
    },
    { name: "SaleRate", type: sql.Decimal(18, 2), value: details.SaleRate },
    { name: "NewStock", type: sql.Int, value: details.NewStock },
    { name: "Remarks", type: sql.VarChar(500), value: details.Remarks ?? "" },
    { name: "ProductID", type: sql.Int, value: details.ProductID ?? 0 },
    { name: "dbQrPath", type: sql.VarChar(500), value: details.dbQrPath ?? "" },
  ]);

  return result.recordset ?? [];
}

export async function getStockDetails(productId: number) {
  const result = await executeProcedure("Proc_GetProductStockDetails", [
    { name: "ProductID", type: sql.Int, value: productId },
  ]);
  return result.recordset ?? [];
}

export async function deductStock(args: {
  ProductID: number;
  UsedQuantity: number;
  OrderNumber: string;
  CreatedBy: string;
}) {
  const result = await executeProcedure("Proc_UseStock", [
    { name: "ProductID", type: sql.Int, value: args.ProductID },
    { name: "UsedQuantity", type: sql.Int, value: args.UsedQuantity },
    { name: "OrderNumber", type: sql.VarChar(100), value: args.OrderNumber },
    { name: "UsedByUserID", type: sql.VarChar(100), value: args.CreatedBy },
  ]);
  return result.recordset ?? [];
}
