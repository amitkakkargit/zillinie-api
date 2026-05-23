import sql from "mssql";
import { executeProcedure, isUsingMockDb } from "../db.js";

const mockProducts = [
  {
    ProductID: 1,
    ProductName: "Mock Shirt",
    Unit: "pcs",
    PurchaseRate: 100.0,
    SaleRate: 150.0,
    CurrentStock: 30,
    Remarks: "Mock product",
  },
  {
    ProductID: 2,
    ProductName: "Mock Suit",
    Unit: "pcs",
    PurchaseRate: 500.0,
    SaleRate: 700.0,
    CurrentStock: 15,
    Remarks: "Mock product",
  },
];

export async function getProducts() {
  if (isUsingMockDb()) {
    return mockProducts;
  }

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
  if (isUsingMockDb()) {
    return [
      {
        ProductID: details.ProductID || Date.now(),
        SubcategoryID: details.SubcategoryID,
        ProductName: details.ProductName,
        Unit: details.Unit,
        PurchaseRate: details.PurchaseRate,
        SaleRate: details.SaleRate,
        CurrentStock: details.NewStock,
        Remarks: details.Remarks ?? "",
      },
    ];
  }

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
  if (isUsingMockDb()) {
    return [
      {
        ProductID: productId,
        StockDate: new Date().toISOString(),
        AvailableQuantity: 42,
        UsedQuantity: 0,
        Remarks: "Mock stock details",
      },
    ];
  }

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
  if (isUsingMockDb()) {
    return [
      {
        ProductID: args.ProductID,
        OrderNumber: args.OrderNumber,
        UsedQuantity: args.UsedQuantity,
        RemainingStock: Math.max(0, 42 - args.UsedQuantity),
        Remarks: "Mock stock deduction",
      },
    ];
  }

  const result = await executeProcedure("Proc_UseStock", [
    { name: "ProductID", type: sql.Int, value: args.ProductID },
    { name: "UsedQuantity", type: sql.Int, value: args.UsedQuantity },
    { name: "OrderNumber", type: sql.VarChar(100), value: args.OrderNumber },
    { name: "UsedByUserID", type: sql.VarChar(100), value: args.CreatedBy },
  ]);
  return result.recordset ?? [];
}
