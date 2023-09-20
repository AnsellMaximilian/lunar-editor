import CodeEditor, { OnChange } from "@monaco-editor/react";
import { useState, useRef, useEffect, useMemo } from "react";
import { BsGear, BsViewStacked, BsChevronDown, BsPencil } from "react-icons/bs";
import { RowValue, TableConfig, TableData } from "../utils/types";
import { faker } from "@faker-js/faker";
import TableView from "../components/TableView";
import { jsonToAttribute } from "../utils/attributes";

type LeftViewMode = "CONFIG" | "VIEW" | "EDITOR";

export default function Editor() {
  const handleEditorChange: OnChange = (value) => {
    setJs(value || "");
  };

  const [js, setJs] = useState("");
  const [pluginName, setPluginName] = useState("Your Plugin Name");
  const [isEditingPluginName, setIsEditingPluginName] = useState(false);
  const [rightViewMode, setRightViewMode] = useState<"TABLE" | "PLUGIN">(
    "TABLE"
  );
  const [leftViewMode, setLeftViewMode] = useState<LeftViewMode>("VIEW");

  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);

  const pluginNameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (pluginNameInputRef.current && isEditingPluginName) {
      pluginNameInputRef.current.focus();
    }
  }, [isEditingPluginName, pluginNameInputRef]);

  const tableData: TableData | null = useMemo(() => {
    if (tableConfig) {
      const rows: TableData = [];
      for (let i = 1; i <= tableConfig.rows; i++) {
        rows.push(
          tableConfig.columnConfigs.reduce((row, col) => {
            let rowValue: RowValue;
            if (col.type === "STRING") {
              rowValue = faker.word.words();
            } else {
              rowValue = faker.number.float();
            }
            return { ...row, [col.name]: rowValue };
          }, {})
        );
      }
      return rows;
    }
    return null;
  }, [tableConfig]);

  return (
    <div className="bg-zinc-600">
      <div className="text-white p-4 flex justify-between items-center">
        {isEditingPluginName ? (
          <input
            className="bg-transparent outline-none border-none"
            onFocus={(e) => e.target.select()}
            ref={pluginNameInputRef}
            onBlur={() => {
              if (pluginName.length === 0) setPluginName("Your Plugin Name");
              setIsEditingPluginName(false);
            }}
            value={pluginName}
            onChange={(e) => setPluginName(e.target.value)}
          />
        ) : (
          <div className="flex gap-2 items-center">
            <h1 className="text-lg font-medium">{pluginName}</h1>
            <button onClick={() => setIsEditingPluginName(true)}>
              <BsPencil />
            </button>
          </div>
        )}
        <div className="flex gap-2">
          <button className="bg-zinc-800 rounded-lg px-4 py-2 flex items-center">
            <BsGear />
          </button>
          <div className="bg-zinc-800 rounded-lg px-4 py-2 flex gap-2 items-center">
            <div>Columns</div>
            <BsChevronDown />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-6 flex flex-col">
          <div className="flex text-white text-sm bg-zinc-700">
            <button
              onClick={() => setLeftViewMode("VIEW")}
              className={`px-4 py-2 flex gap-2 items-center ${
                leftViewMode === "VIEW" ? "bg-vs-dark" : "bg-zinc-800 "
              }`}
            >
              <BsViewStacked /> <span>View</span>
            </button>
            <button
              onClick={() => setLeftViewMode("CONFIG")}
              className={`px-4 py-2 flex gap-2 items-center ${
                leftViewMode === "CONFIG" ? "bg-vs-dark" : "bg-zinc-800 "
              }`}
            >
              <BsGear /> <span>Configuration</span>
            </button>
            <button
              onClick={() => setLeftViewMode("EDITOR")}
              className={`px-4 py-2 flex gap-2 items-center ${
                leftViewMode === "EDITOR" ? "bg-vs-dark" : "bg-zinc-800 "
              }`}
            >
              <BsPencil /> <span>Editor</span>
            </button>
          </div>
          <CodeEditor
            height="75vh"
            defaultLanguage="javascript"
            language="javascript"
            theme="vs-dark"
            defaultValue="// some comment"
            onChange={handleEditorChange}
            className="grow"
          />
        </div>
        <div className="col-span-6 flex flex-col">
          <div className="flex text-white text-sm bg-zinc-700 justify-end">
            <button
              className={`px-4 py-2 flex gap-2 items-center ${
                rightViewMode === "TABLE" ? "bg-vs-dark" : "bg-zinc-800 "
              }`}
              onClick={() => setRightViewMode("TABLE")}
            >
              <BsViewStacked /> <span>Table View</span>
            </button>
            <button
              className={`px-4 py-2 flex gap-2 items-center ${
                rightViewMode === "PLUGIN" ? "bg-vs-dark" : "bg-zinc-800"
              }`}
              onClick={() => setRightViewMode("PLUGIN")}
            >
              <BsGear /> <span>Plugin View</span>
            </button>
          </div>
          {rightViewMode === "TABLE" ? (
            <TableView
              tableData={tableData}
              setTableConfig={setTableConfig}
              tableConfig={tableConfig}
            />
          ) : (
            <iframe
              className="bg-white grow"
              srcDoc={`
                <html>
                    <head>
                        <script>
                          ${js}
                          window.customElements.define(
                            "outerbase-plugin-table",
                            OuterbasePluginTable_$PLUGIN_ID
                          );
                          window.customElements.define(
                            "outerbase-plugin-table-configuration",
                            OuterbasePluginTableConfiguration_$PLUGIN_ID
                          );
                        </script>
                    </head>
                    <body>
                          <outerbase-plugin-table 
                            configuration="{}"
                            ${
                              tableData
                                ? `tableValue="${jsonToAttribute(tableData)}"`
                                : ""
                            }
                            >
                          </outerbase-plugin-table>
                    </body>
                </html>
            `}
              title="output"
              sandbox="allow-scripts"
              width="100%"
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
}
