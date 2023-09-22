export type ColumnType = "STRING" | "NUMBER" | "IMAGE" | "TRUE_FALSE";
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
