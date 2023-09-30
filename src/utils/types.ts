export type ColumnType =
  | "STRING"
  | "NUMBER"
  | "IMAGE"
  | "TRUE_FALSE"
  | "BITCOIN_ADDRESS"
  | "FULL_NAME"
  | "SONG_NAME"
  | "INTEGER"
  | "AUTO_INCREMENT"
  | "SENTENCE"
  | "HTML"
  | "PHONE_NUMBER"
  | "LONGITUDE"
  | "LATITUDE";
export type RowValue = string | number;
export type Row = { [key: string]: RowValue[] };
export type TableData = Row[];

export interface ColumnConfig {
  id: string;
  name: string;
  type: ColumnType;
}

export interface TableConfig {
  name: string;
  rows: number;
  columnConfigs: ColumnConfig[];
}

export type JsonObject = { [key: string]: JsonValue };

export type JsonValue =
  | null
  | boolean
  | number
  | string
  | JsonValue[]
  | JsonObject;

export type PluginMode = "TABLE" | "COLUMN";

export interface OuterbaseResponse<T> {
  success: boolean;
  response: {
    count: number;
    items: T[];
  };
}

export interface Plugin {
  id: string;
  plugin_name: string;
  plugin_code: string;
  plugin_type: PluginMode;
  visibility: "PRIVATE" | "PUBLIC";
}

export type Theme = "LIGHT" | "DARK";
