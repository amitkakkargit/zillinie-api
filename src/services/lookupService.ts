import * as lookupRepo from "../repositories/lookupRepository.js";

export async function getLookupData() {
  const [categories, productTypes, units, statusTypes, professions, branches] =
    await Promise.all([
      lookupRepo.getCategories(),
      lookupRepo.getProductTypes(),
      lookupRepo.getUnits(),
      lookupRepo.getStatusTypes(),
      lookupRepo.getProfessions(),
      lookupRepo.getBranches(),
    ]);

  return {
    categories,
    productTypes,
    units,
    statusTypes,
    professions,
    branches,
  };
}

export async function getSubcategoriesByCategory(categoryId: number) {
  return lookupRepo.getSubcategories(categoryId);
}
