import { ColumnType, RowValue, TableConfig, TableData } from "./types";
import { faker } from "@faker-js/faker";

const valueGenerator = (columnType: ColumnType): RowValue => {
  switch (columnType) {
    case "STRING":
      return faker.word.words();
    case "NUMBER":
      return faker.number.float();
    case "IMAGE":
      return faker.image.url();
    case "TRUE_FALSE":
      return faker.datatype.boolean() ? "true" : "false";
    default:
      return faker.word.words();
  }
};

export const generateTableData = (tableConfig: TableConfig): TableData => {
  const rows: TableData = [];
  for (let i = 1; i <= tableConfig.rows; i++) {
    rows.push(
      tableConfig.columnConfigs.reduce((row, col) => {
        return { ...row, [col.name]: valueGenerator(col.type) };
      }, {})
    );
  }
  return rows;
};
