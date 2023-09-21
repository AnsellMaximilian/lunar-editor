import CodeEditor, { OnChange } from "@monaco-editor/react";
import { useState, useRef, useEffect, useMemo } from "react";
import { BsGear, BsViewStacked, BsChevronDown, BsPencil } from "react-icons/bs";
import { TableConfig, TableData } from "../utils/types";
import TableView from "../components/TableView";
import { generateTableData } from "../utils/tables";
import { configCss, configHtml, customEventListenersJs } from "../utils/output";
import Resizer from "../components/Resizer";

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
  const [editorWidth, setEditorWidth] = useState({
    current: 300,
    initial: 300,
  });

  useEffect(() => {
    if (pluginNameInputRef.current && isEditingPluginName) {
      pluginNameInputRef.current.focus();
    }
  }, [isEditingPluginName, pluginNameInputRef]);

  const tableData: TableData | null = useMemo(() => {
    if (tableConfig) {
      return generateTableData(tableConfig);
    }
    return null;
  }, [tableConfig]);

  return (
    <div className="bg-zinc-600 h-screen flex flex-col">
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
      <div className="grow flex">
        <div className="flex flex-col" style={{ width: editorWidth.current }}>
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
            defaultLanguage="javascript"
            language="javascript"
            theme="vs-dark"
            defaultValue="// some comment"
            onChange={handleEditorChange}
            className="grow"
          />
        </div>
        <Resizer
          onMouseUp={() =>
            setEditorWidth((prev) => ({ ...prev, initial: prev.current }))
          }
          onResize={(deltaPos) => {
            if (editorWidth.current <= 900 || deltaPos.x <= 0) {
              setEditorWidth((prev) => {
                return {
                  ...prev,
                  current: prev.initial + deltaPos.x,
                };
              });
            }
          }}
        />
        <div className="grow flex flex-col">
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
          <div
            className={`grow flex flex-col ${
              rightViewMode === "TABLE" ? "flex" : "hidden"
            }`}
          >
            <TableView
              tableData={tableData}
              setTableConfig={setTableConfig}
              tableConfig={tableConfig}
            />
          </div>
          <iframe
            className={`bg-white grow ${
              rightViewMode === "PLUGIN" ? "flex" : "hidden"
            }`}
            srcDoc={`
                <html>
                    <head>
                        <style>
                          ${configCss}
                        </style>
                        <script>
                          ${js}
                          window.customElements.define(
                            "outerbase-plugin-table",
                            OuterbasePluginTable_$PLUGIN_ID
                          );
                          window.customElements.define(
                            "outerbase-plugin-configuration",
                            OuterbasePluginConfiguration_$PLUGIN_ID
                          );
                        </script>
                    </head>
                    <body>
                          ${configHtml(tableData)}
                          <script>${customEventListenersJs(tableData)}</script>
                    </body>
                </html>
            `}
            title="output"
            sandbox="allow-scripts"
            width="100%"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
