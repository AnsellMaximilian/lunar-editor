import { Dialog } from "@headlessui/react";
import { useState, Dispatch } from "react";
import { BsPlus } from "react-icons/bs";
import { nanoid } from "nanoid";
import { BsGear, BsTable, BsChevronDown } from "react-icons/bs";
import {
  ColumnConfig,
  ColumnType,
  TableConfig,
  TableData,
} from "../utils/types";

export default function TableView({
  setTableConfig,
  tableConfig,
  tableData,
}: {
  setTableConfig: Dispatch<React.SetStateAction<TableConfig | null>>;
  tableConfig: TableConfig | null;
  tableData: TableData | null;
}) {
  const [tableName, setTableName] = useState("");
  const [tableRows, setTableRows] = useState(10);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [columnConfigs, setColumnConfigs] = useState<ColumnConfig[]>([]);
  const [columnName, setColumnName] = useState("");
  const [columnType, setColumnType] = useState<ColumnType>("STRING");

  const handleAddColumnConfig = () => {
    if (!columnName) return;
    setColumnConfigs((prev) => [
      ...prev,
      { name: columnName, type: columnType, id: nanoid() },
    ]);
    setColumnName("");
  };

  const onCreate = () => {
    if (tableName && tableRows && columnConfigs.length > 0) {
      setTableConfig({
        name: tableName,
        rows: tableRows,
        columnConfigs,
      });
      setTableName("");
      setTableRows(10);
      setColumnConfigs([]);
      setIsCreateDialogOpen(false);
    }
  };

  const onEditConfig = () => {
    if (tableConfig) {
      setIsCreateDialogOpen(true);
      setTableName(tableConfig.name);
      setTableRows(tableConfig.rows);
      setColumnConfigs(tableConfig.columnConfigs);
    }
  };

  return (
    <div className="grow p-4 bg-white flex flex-col">
      {tableConfig && tableData ? (
        <div className="grow w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium flex gap-2 items-center">
              <BsTable /> <span>{tableConfig.name}</span>
            </h2>
            <button onClick={onEditConfig}>
              <BsGear />
            </button>
          </div>
          <table className="w-full border-collapse border border-zinc-300 ">
            <thead>
              <tr>
                <th className="py-1 px-2 border border-zinc-300">#</th>
                {tableConfig.columnConfigs.map((col) => (
                  <th key={col.id} className="py-1 px-2 border border-zinc-300">
                    <div className="flex items-center justify-between">
                      <span>{col.name}</span>
                      <button>
                        <BsChevronDown />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, i) => (
                <tr key={i}>
                  <td className="py-1 px-2 border border-zinc-300 text-center">
                    {i + 1}
                  </td>

                  {tableConfig.columnConfigs.map((col, i) => (
                    <td className="py-1 px-2 border border-zinc-300" key={i}>
                      {row[col.name]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grow mx-auto flex flex-col justify-center items-center gap-2 max-w-sm">
          <div className="text-center">
            You haven't setup your mock table data yet. In order to preview your
            plugin, you need to set up your table structure first.
          </div>
          <button
            className="bg-zinc-800 text-white px-4 py-2 rounded-lg"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            Create Table Data
          </button>
        </div>
      )}
      <Dialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <Dialog.Panel className="mx-auto rounded bg-zinc-600 text-white p-4 min-w-[400px] max-w-full">
            <Dialog.Title className="font-medium mb-4 text-lg">
              Create Your Table Structure
            </Dialog.Title>
            <div className="mb-4">
              <div className="flex flex-col gap-2">
                <div className="bg-zinc-700 p-4 rounded-md">
                  <label
                    htmlFor="table_name"
                    className="block mb-2 text-sm font-medium "
                  >
                    Table Name
                  </label>
                  <input
                    type="text"
                    value={tableName}
                    onChange={(e) => setTableName(e.target.value)}
                    id="table_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-vs-dark focus:border-vs-dark block w-full p-2.5 outline-none"
                    placeholder="mytable"
                  />
                </div>
                <div className="bg-zinc-700 p-4 rounded-md">
                  <div className="mb-2 text-sm font-medium">Columns</div>
                  <div className="mb-2 flex flex-col gap-2">
                    {columnConfigs.map((col) => (
                      <div
                        key={col.id}
                        className="bg-zinc-600 p-2 rounded-sm border border-zinc-500 flex gap-2"
                      >
                        <div className="grow flex items-center justify-between">
                          <div>{col.name}</div>
                          <div>{col.type}</div>
                        </div>
                        <button
                          onClick={() =>
                            setColumnConfigs((prev) =>
                              prev.filter((curr) => curr.id !== col.id)
                            )
                          }
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="column_name"
                      value={columnName}
                      onChange={(e) => setColumnName(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-vs-dark focus:border-vs-dark block w-full p-2.5 outline-none"
                      placeholder="Column Name"
                    />
                    <select
                      value={columnType}
                      onChange={(e) =>
                        setColumnType(e.target.value as ColumnType)
                      }
                      id="column_type"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-vs-dark focus:border-vs-dark block w-full p-2.5 outline-none"
                    >
                      <option value="STRING">String</option>
                      <option value="NUMBER">Number</option>
                      <option value="IMAGE">Image</option>
                    </select>
                    <button
                      className="bg-zinc-800 text-white px-4 py-2 rounded-md"
                      onClick={handleAddColumnConfig}
                    >
                      <BsPlus />
                    </button>
                  </div>
                </div>
                <div className="bg-zinc-700 p-4 rounded-md">
                  <label
                    htmlFor="Row Number"
                    className="block mb-2 text-sm font-medium "
                  >
                    Row Number
                  </label>
                  <input
                    value={tableRows}
                    onChange={(e) => setTableRows(parseInt(e.target.value))}
                    type="number"
                    id="Row Number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-vs-dark focus:border-vs-dark block w-full p-2.5 outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-zinc-800 px-4 py-2 rounded-md"
                onClick={onCreate}
              >
                Create
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
