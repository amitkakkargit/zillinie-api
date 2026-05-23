import sql from "mssql";
import { executeProcedure, isUsingMockDb } from "../db.js";

export interface MeasurementData {
  orderNumber: number;
  productType: string;
  measurementTakenBy: number;
  customerId: number;
  trialDate?: string;
  deliveryDate?: string;
  lengthU?: string;
  chestU?: string;
  waistU?: string;
  hipU?: string;
  shoulderU?: string;
  sleeveU?: string;
  neckU?: string;
  cuffU?: string;
  bicepU?: string;
  wristU?: string;
  lengthL?: string;
  waistL?: string;
  hipL?: string;
  frontL?: string;
  allRoundL?: string;
  thighL?: string;
  bottomL?: string;
  kneeL?: string;
  calfL?: string;
  remarks?: string;
  filePath?: string;
  totalAmount?: number;
  advanceAmount?: number;
  branchId?: string;
  measurementDate?: string;
}

export async function saveMeasurement(data: MeasurementData) {
  if (isUsingMockDb()) {
    return [
      {
        MeasurementId: Date.now(),
        ...data,
        MeasurementDate: data.measurementDate ?? new Date().toISOString(),
        TrialDate: data.trialDate ?? null,
        DeliveryDate: data.deliveryDate ?? null,
      },
    ];
  }

  const result = await executeProcedure("Proc_SaveMeasurementData", [
    {
      name: "ProductType",
      type: sql.VarChar(100),
      value: data.productType ?? "",
    },
    {
      name: "MeasurementTakenBy",
      type: sql.Int,
      value: Number(data.measurementTakenBy) || 0,
    },
    {
      name: "OrderNumber",
      type: sql.Int,
      value: Number(data.orderNumber) || 0,
    },
    { name: "Length_U", type: sql.VarChar(100), value: data.lengthU ?? "" },
    { name: "Chest_U", type: sql.VarChar(100), value: data.chestU ?? "" },
    { name: "Waist_U", type: sql.VarChar(100), value: data.waistU ?? "" },
    { name: "Hip_U", type: sql.VarChar(100), value: data.hipU ?? "" },
    { name: "Shoulder_U", type: sql.VarChar(100), value: data.shoulderU ?? "" },
    { name: "Sleeve_U", type: sql.VarChar(100), value: data.sleeveU ?? "" },
    { name: "Neck_U", type: sql.VarChar(100), value: data.neckU ?? "" },
    { name: "Cuff_U", type: sql.VarChar(100), value: data.cuffU ?? "" },
    { name: "Bicep_U", type: sql.VarChar(100), value: data.bicepU ?? "" },
    { name: "Wrist_U", type: sql.VarChar(100), value: data.wristU ?? "" },
    { name: "Length_L", type: sql.VarChar(100), value: data.lengthL ?? "" },
    { name: "Waist_L", type: sql.VarChar(100), value: data.waistL ?? "" },
    { name: "Hip_L", type: sql.VarChar(100), value: data.hipL ?? "" },
    { name: "Front_L", type: sql.VarChar(100), value: data.frontL ?? "" },
    { name: "AllRound_L", type: sql.VarChar(100), value: data.allRoundL ?? "" },
    { name: "Thigh_L", type: sql.VarChar(100), value: data.thighL ?? "" },
    { name: "Bottom_L", type: sql.VarChar(100), value: data.bottomL ?? "" },
    { name: "Knee_L", type: sql.VarChar(100), value: data.kneeL ?? "" },
    { name: "Calf_L", type: sql.VarChar(100), value: data.calfL ?? "" },
    { name: "FilePath", type: sql.VarChar(500), value: data.filePath ?? "" },
    { name: "Remarks", type: sql.VarChar(500), value: data.remarks ?? "" },
    { name: "CreatedBy", type: sql.VarChar(100), value: "System" },
    {
      name: "TrialDate",
      type: sql.DateTime,
      value: data.trialDate ? new Date(data.trialDate) : null,
    },
    {
      name: "DeliveryDate",
      type: sql.DateTime,
      value: data.deliveryDate ? new Date(data.deliveryDate) : null,
    },
    { name: "CustomerId", type: sql.Int, value: Number(data.customerId) || 0 },
    {
      name: "TotalAmount",
      type: sql.Decimal(18, 2),
      value: Number(data.totalAmount) || 0,
    },
    {
      name: "AdvanceAmount",
      type: sql.Decimal(18, 2),
      value: Number(data.advanceAmount) || 0,
    },
    { name: "BranchId", type: sql.VarChar(100), value: data.branchId ?? "" },
    {
      name: "MeasurementDate",
      type: sql.DateTime,
      value: data.measurementDate ? new Date(data.measurementDate) : new Date(),
    },
  ]);

  return result.recordset ?? [];
}

export async function fetchMeasurementDetails(orderNumber: string) {
  if (isUsingMockDb()) {
    return [
      {
        OrderNumber: orderNumber,
        ProductType: "Mock Tailoring",
        MeasurementTakenBy: 1,
        CustomerId: 1,
        CustomerName: "Mock Customer",
        TrialDate: new Date().toISOString(),
        DeliveryDate: new Date().toISOString(),
        Length_U: "40",
        Chest_U: "38",
        Waist_U: "34",
        Hip_U: "39",
        Shoulder_U: "16",
        Sleeve_U: "24",
        Neck_U: "15",
        Cuff_U: "8",
        Bicep_U: "13",
        Wrist_U: "7",
        Length_L: "42",
        Waist_L: "34",
        Hip_L: "39",
        Front_L: "10",
        AllRound_L: "40",
        Thigh_L: "22",
        Bottom_L: "16",
        Knee_L: "14",
        Calf_L: "13",
        Remarks: "Mock measurement record",
      },
    ];
  }

  const result = await executeProcedure(
    "Proc_GetMeasurementDetailsByOrderNumber",
    [
      { name: "OrderNumber", type: sql.VarChar(100), value: orderNumber },
      { name: "Command", type: sql.VarChar(100), value: "" },
      { name: "CreatedBy", type: sql.VarChar(100), value: "" },
    ],
  );

  return result.recordset ?? [];
}

export async function fetchMeasurementList() {
  if (isUsingMockDb()) {
    return [
      {
        MeasurementId: 1,
        OrderNumber: 1001,
        ProductType: "Shirt",
        CustomerName: "Mock Customer",
        TotalAmount: 120.0,
        AdvanceAmount: 50.0,
        RemainingAmount: 70.0,
        MeasurementDate: new Date().toISOString(),
      },
      {
        MeasurementId: 2,
        OrderNumber: 1002,
        ProductType: "Suit",
        CustomerName: "Sample Customer",
        TotalAmount: 250.0,
        AdvanceAmount: 100.0,
        RemainingAmount: 150.0,
        MeasurementDate: new Date().toISOString(),
      },
    ];
  }

  try {
    const result = await executeProcedure("Proc_GetMeasurementList", []);
    return result.recordset ?? [];
  } catch (err) {
    console.warn(
      "Measurement list proc missing or failed, returning empty list",
      err instanceof Error ? err.message : String(err),
    );
    return [];
  }
}
