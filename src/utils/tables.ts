import { ColumnType, RowValue, TableConfig, TableData } from "./types";
import { faker } from "@faker-js/faker";

const generateHTML = () => {
  return `<main>
    <h1>${faker.lorem.sentence()}</h1>
    <p>${faker.lorem.paragraph()}</p>
    <button>Button</button>
  </main>`;
};

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
    case "BITCOIN_ADDRESS":
      return faker.finance.bitcoinAddress();
    case "FULL_NAME":
      return faker.person.fullName();
    case "SONG_NAME":
      return faker.music.songName();
    case "INTEGER":
      return faker.number.int();
    case "SENTENCE":
      return faker.lorem.sentence();
    case "PHONE_NUMBER":
      return faker.phone.number();
    case "HTML":
      return generateHTML();
    case "LONGITUDE":
      return faker.location.longitude();
    case "LATITUDE":
      return faker.location.latitude();
    default:
      return faker.word.words();
  }
};

export const generateTableData = (tableConfig: TableConfig): TableData => {
  const rows: TableData = [];
  for (let i = 1; i <= tableConfig.rows; i++) {
    rows.push(
      tableConfig.columnConfigs.reduce((row, col) => {
        return {
          ...row,
          [col.name]:
            col.type === "AUTO_INCREMENT" ? i : valueGenerator(col.type),
        };
      }, {})
    );
  }
  return rows;
};
