import sql from "mssql";
import { executeProcedure, isUsingMockDb } from "../db.js";

const mockProductTypes = [
  { ProductTypeId: 1, ProductType: "Shirts" },
  { ProductTypeId: 2, ProductType: "Suits" },
  { ProductTypeId: 3, ProductType: "Pants" },
];

const mockUnits = [
  { UnitId: 1, UnitName: "pcs" },
  { UnitId: 2, UnitName: "meter" },
];

const mockStatusTypes = [
  { StatusId: 1, StatusName: "Pending" },
  { StatusId: 2, StatusName: "Completed" },
];

const mockProfessions = [
  { ProfessionId: 1, ProfessionName: "Tailor" },
  { ProfessionId: 2, ProfessionName: "Cutter" },
];

const mockBranches = [{ BranchId: 1, BranchName: "Main Branch" }];

const mockCategories = [{ CategoryId: 1, CategoryName: "Clothing" }];

const mockSubcategories = [
  { SubcategoryId: 1, CategoryId: 1, SubcategoryName: "Shirts" },
  { SubcategoryId: 2, CategoryId: 1, SubcategoryName: "Pants" },
];

export async function getCategories() {
  if (isUsingMockDb()) {
    return mockCategories;
  }

  const result = await executeProcedure("Proc_GetCategory");
  return result.recordset ?? [];
}

export async function getSubcategories(categoryId: number) {
  if (isUsingMockDb()) {
    return mockSubcategories.filter((item) => item.CategoryId === categoryId);
  }

  const result = await executeProcedure("Proc_GetSubCategory", [
    { name: "categoryId", type: sql.Int, value: categoryId },
  ]);
  return result.recordset ?? [];
}

export async function getProductTypes() {
  if (isUsingMockDb()) {
    return mockProductTypes;
  }

  const result = await executeProcedure("Proc_GetProductType");
  return result.recordset ?? [];
}

export async function getUnits() {
  if (isUsingMockDb()) {
    return mockUnits;
  }

  const result = await executeProcedure("Proc_GetUnit");
  return result.recordset ?? [];
}

export async function getStatusTypes() {
  if (isUsingMockDb()) {
    return mockStatusTypes;
  }

  const result = await executeProcedure("Proc_GetStatus");
  return result.recordset ?? [];
}

export async function getProfessions() {
  if (isUsingMockDb()) {
    return mockProfessions;
  }

  const result = await executeProcedure("Proc_GetStaffProfession");
  return result.recordset ?? [];
}

export async function getBranches() {
  if (isUsingMockDb()) {
    return mockBranches;
  }

  const result = await executeProcedure("Proc_GetBranchName");
  return result.recordset ?? [];
}
