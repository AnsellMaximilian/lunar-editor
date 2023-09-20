import { JsonObject } from "./types";

export const attributeToJson = (value: string) => {
  return JSON.parse(value)
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
};

export const jsonToAttribute = (value: JsonObject | JsonObject[]) => {
  return JSON.stringify(value).replace(/"/g, "&quot;").replace(/'/g, "&#39;");
};
