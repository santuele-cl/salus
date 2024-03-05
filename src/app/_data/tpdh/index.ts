import { TPDH_LAB_PROCEDURE_CATEGORY } from "./labotoray-procedures";

export const LAB_CATEGORY_SEED_DATA = TPDH_LAB_PROCEDURE_CATEGORY.map(
  (category, categoryIndex) => {
    return {
      id: `${"LP" + categoryIndex + 1 + "0000"}`,
      categoryName: category.categoryName,
    };
  }
);

export const PROCEDURE_SEED_DATA = TPDH_LAB_PROCEDURE_CATEGORY.map(
  ({ procedures }, categoryIndex) => {
    const procedure = procedures.map((item, procedureIndex) => ({
      id: `${"LP" + categoryIndex + 1 + "0000" + procedureIndex}`,
      procedureName: item,
      labProcedureCategoryId: `${"LP" + categoryIndex + 1 + "0000"}`,
    }));
    return procedure;
  }
);

export const PROCEDURE_SEED_DATA_FLATTEN = PROCEDURE_SEED_DATA.flat();
