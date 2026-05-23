import sql from "mssql";
import { getPool, isUsingMockDb } from "../db.js";

export async function getPaymentsByOrder(orderId: number) {
  if (isUsingMockDb()) {
    return [
      {
        PaymentID: 1,
        OrderID: orderId,
        PaymentDate: new Date().toISOString(),
        AmountPaid: 0,
      },
    ];
  }

  const pool = await getPool();
  const result = await pool
    .request()
    .input("OrderID", sql.Int, orderId)
    .query(
      "SELECT PaymentID, PaymentDate, AmountPaid FROM Payments WHERE OrderID = @OrderID",
    );

  return result.recordset ?? [];
}

export async function getOrderBalance(orderId: number) {
  if (isUsingMockDb()) {
    return {
      OrderID: orderId,
      TotalAmount: 120.0,
      RemainingAmount: 120.0,
    };
  }

  const pool = await getPool();
  const result = await pool
    .request()
    .input("OrderID", sql.Int, orderId)
    .query(
      "SELECT TotalAmount, RemainingAmount FROM Orders WHERE OrderID = @OrderID",
    );

  return result.recordset?.[0] ?? null;
}

export async function savePayment(orderId: number, amountPaid: number) {
  if (isUsingMockDb()) {
    return {
      OrderID: orderId,
      TotalAmount: 120.0,
      RemainingAmount: 120.0 - amountPaid,
    };
  }

  const pool = await getPool();
  await pool
    .request()
    .input("OrderID", sql.Int, orderId)
    .input("AmountPaid", sql.Decimal(18, 2), amountPaid)
    .query(
      "INSERT INTO Payments (OrderID, AmountPaid) VALUES (@OrderID, @AmountPaid)",
    );

  await pool
    .request()
    .input("OrderID", sql.Int, orderId)
    .input("AmountPaid", sql.Decimal(18, 2), amountPaid)
    .query(
      "UPDATE Orders SET RemainingAmount = RemainingAmount - @AmountPaid WHERE OrderID = @OrderID",
    );

  return getOrderBalance(orderId);
}
