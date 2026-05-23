import sql from "mssql";
import { executeProcedure, getPool, isUsingMockDb } from "../db.js";

export async function getOrderList(searchTerm = "") {
  if (isUsingMockDb()) {
    return [
      {
        OrderId: 1,
        OrderNumber: "MOCK-1001",
        CustomerName: "Mock Customer",
        TotalAmount: 120.0,
        RemainingAmount: 120.0,
        CreatedDate: new Date().toISOString(),
      },
    ];
  }

  const result = await executeProcedure("Proc_GetProductDetailsCustomerWise", [
    { name: "SearchTerm", type: sql.VarChar(250), value: searchTerm },
    { name: "TrialDate", type: sql.VarChar(50), value: "" },
    { name: "DeliveryDate", type: sql.VarChar(50), value: "" },
  ]);
  return result.recordset ?? [];
}

export async function getOrderByNumber(orderNumber: string) {
  if (isUsingMockDb()) {
    return [
      {
        OrderId: 1,
        OrderNumber: orderNumber,
        CustomerName: "Mock Customer",
        OrderDate: new Date().toISOString(),
        Quantity: 1,
        ProductName: "Mock Tailoring Item",
        UnitPrice: 120.0,
        TotalAmount: 120.0,
        RemainingAmount: 120.0,
      },
    ];
  }

  const result = await executeProcedure("Proc_GetProductListByOrderNumber", [
    { name: "OrderNumber", type: sql.VarChar(100), value: orderNumber },
  ]);
  return result.recordset ?? [];
}

export async function createOrder(data: any) {
  // data: { customerId, items: [{ productId, quantity, price }], total }
  if (isUsingMockDb()) {
    const fakeId = Date.now();
    const fakeNumber = `MOCK-${fakeId}`;
    return {
      orderId: fakeId,
      orderNumber: fakeNumber,
      balance: data.total ?? 0,
    };
  }

  const pool = await getPool();
  // create order and order items inside a transaction
  const tx = new sql.Transaction(pool);
  await tx.begin();
  try {
    const request = tx.request();
    const orderNumber = `ORD-${Date.now()}`;
    const insertOrderResult = await request
      .input("CustomerID", sql.Int, data.customerId ?? 0)
      .input("TotalAmount", sql.Decimal(18, 2), data.total ?? 0)
      .input("OrderNumber", sql.VarChar(100), orderNumber)
      .query(
        "INSERT INTO Orders (CustomerID, TotalAmount, OrderNumber) OUTPUT inserted.OrderID VALUES (@CustomerID, @TotalAmount, @OrderNumber)",
      );

    const newOrderId = insertOrderResult.recordset?.[0]?.OrderID ?? null;

    if (newOrderId && Array.isArray(data.items)) {
      for (const it of data.items) {
        await tx
          .request()
          .input("OrderID", sql.Int, newOrderId)
          .input("ProductID", sql.Int, it.productId)
          .input("Quantity", sql.Int, it.quantity)
          .input("UnitPrice", sql.Decimal(18, 2), it.price)
          .query(
            "INSERT INTO OrderItems (OrderID, ProductID, Quantity, UnitPrice) VALUES (@OrderID, @ProductID, @Quantity, @UnitPrice)",
          );
      }
    }

    await tx.commit();
    return { orderId: newOrderId, orderNumber };
  } catch (err) {
    await tx.rollback();
    throw err;
  }
}
