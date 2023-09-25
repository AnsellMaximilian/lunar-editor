import CodeEditor, { OnChange } from "@monaco-editor/react";
import { useState, useRef, useEffect, useMemo } from "react";
import {
  BsViewStacked,
  BsPencil,
  BsCodeSlash,
  BsTable,
  BsFillCloudFill,
  BsFillCloudCheckFill,
  BsFillCloudSlashFill,
} from "react-icons/bs";
import { FiCopy } from "react-icons/fi";
import { PluginMode, TableConfig, TableData } from "../utils/types";
import TableView from "../components/TableView";
import { generateTableData } from "../utils/tables";
import iconLight from "../assets/lunar-icon-light.svg";
import {
  configCss,
  configHtml,
  customEventListenersJs,
  sanitizeComponentNames,
} from "../utils/output";
import Resizer from "../components/Resizer";
import TemplateGenerator from "../components/TemplateGeneration";
import { Link, useParams } from "react-router-dom";
import { UserButton, useAuth } from "@clerk/clerk-react";
import LoginModal from "../components/LoginModal";
import { createPlugin } from "../services";

type LeftViewMode = "CONFIG" | "VIEW" | "EDITOR";

export default function Editor() {
  const { id } = useParams();

  console.log(id);

  const { userId, isSignedIn } = useAuth();
  const handleEditorChange: OnChange = (value) => {
    setJs(value || "");
  };

  const [js, setJs] = useState("");
  const [oldCode, setOldCode] = useState("");
  const [pluginName, setPluginName] = useState("Your Plugin Name");
  const [isEditingPluginName, setIsEditingPluginName] = useState(false);
  const [rightViewMode, setRightViewMode] = useState<"TABLE" | "PLUGIN">(
    "TABLE"
  );
  const [pluginMode, setPluginMode] = useState<PluginMode>("TABLE");
  const [leftViewMode, setLeftViewMode] = useState<LeftViewMode>("VIEW");

  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);

  const pluginNameInputRef = useRef<HTMLInputElement>(null);
  const [editorWidth, setEditorWidth] = useState({
    current: 300,
    initial: 300,
  });

  const [isTemplateGeneratorOpen, setIsTemplateGeneratorOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const [cloudSaveState, setCloudSaveState] = useState<
    "UP_TO_DATE" | "PENDING_CHANGES" | "SUCCESS" | "LOADING"
  >("UP_TO_DATE");

  const handleGenerateCode = (code: string) => {
    setJs(code);
    setIsTemplateGeneratorOpen(false);
  };

  const save = async () => {
    if (!isSignedIn) {
      setIsLoginModalOpen(true);
    } else {
      if (!(cloudSaveState === "UP_TO_DATE")) {
        try {
          setCloudSaveState("LOADING");
          const res = await createPlugin(userId, pluginName, js, pluginMode);
          if (res.data.success) {
            setCloudSaveState("SUCCESS");
            setOldCode(js);
            setTimeout(() => {
              setCloudSaveState("UP_TO_DATE");
            }, 1500);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  useEffect(() => {
    if (js !== oldCode) setCloudSaveState("PENDING_CHANGES");
  }, [js, oldCode]);

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
      <div className="text-white px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/">
            <img src={iconLight} className="w-16" />
          </Link>
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
        </div>
        <div className="flex gap-2">
          <button
            onClick={save}
            title="Copy Plugin Code"
            className="bg-zinc-800 hover:bg-zinc-900 rounded-lg px-4 py-2 flex items-center gap-2"
          >
            {cloudSaveState === "UP_TO_DATE" ? (
              <BsFillCloudFill />
            ) : cloudSaveState === "PENDING_CHANGES" ? (
              <BsFillCloudSlashFill className="text-yellow-600" />
            ) : cloudSaveState === "SUCCESS" ? (
              <BsFillCloudCheckFill className="text-green-600" />
            ) : (
              <BsFillCloudSlashFill className="text-yellow-600" />
            )}
            <span>Save</span>
          </button>
          <button
            title="Copy Plugin Code"
            className="bg-zinc-800 hover:bg-zinc-900 rounded-lg px-4 py-2 flex items-center"
          >
            <FiCopy />
          </button>
          <button
            title="Generate Template Code"
            className="bg-zinc-800 hover:bg-zinc-900 rounded-lg px-4 py-2 flex items-center"
            onClick={() => setIsTemplateGeneratorOpen(true)}
          >
            <BsCodeSlash />
          </button>
          <div className="rounded-lg flex overflow-hidden">
            <button
              onClick={() => {
                setPluginMode("COLUMN");
                setRightViewMode("TABLE");
              }}
              className={`px-4 py-2 ${
                pluginMode === "COLUMN"
                  ? "bg-zinc-800 hover:bg-zinc-900"
                  : "bg-zinc-700 text-zinc-500 hover:bg-zinc-800"
              }`}
            >
              Column
            </button>
            <button
              onClick={() => setPluginMode("TABLE")}
              className={`px-4 py-2 ${
                pluginMode === "TABLE"
                  ? "bg-zinc-800 hover:bg-zinc-900"
                  : "bg-zinc-700 text-zinc-500 hover:bg-zinc-800"
              }`}
            >
              Table
            </button>
          </div>
          <div className="flex items-center">
            <UserButton />
          </div>
        </div>
      </div>
      <div className="grow flex">
        <div className="flex flex-col" style={{ width: editorWidth.current }}>
          <div className="flex text-white text-sm bg-zinc-700 whitespace-nowrap">
            <button
              onClick={() => setLeftViewMode("VIEW")}
              className={`px-4 py-2 flex gap-2 items-center ${
                leftViewMode === "VIEW" ? "bg-vs-dark" : "bg-zinc-800 "
              }`}
            >
              <BsCodeSlash /> <span>Plugin Code</span>
            </button>
          </div>
          <CodeEditor
            defaultLanguage="javascript"
            language="javascript"
            theme="vs-dark"
            value={js ? js : undefined}
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
            setEditorWidth((prev) => {
              return {
                ...prev,
                current: prev.initial + deltaPos.x,
              };
            });
          }}
        />
        <div className="grow flex flex-col overflow-x-auto basis-0">
          <div className="flex text-white text-sm bg-zinc-700 justify-end whitespace-nowrap">
            <button
              className={`px-4 py-2 flex gap-2 items-center ${
                rightViewMode === "TABLE" ? "bg-vs-dark" : "bg-zinc-800 "
              }`}
              onClick={() => setRightViewMode("TABLE")}
            >
              <BsTable /> <span>Table View</span>
            </button>
            {pluginMode === "TABLE" && (
              <button
                className={`px-4 py-2 flex gap-2 items-center ${
                  rightViewMode === "PLUGIN" ? "bg-vs-dark" : "bg-zinc-800"
                }`}
                onClick={() => setRightViewMode("PLUGIN")}
              >
                <BsViewStacked /> <span>Plugin View</span>
              </button>
            )}
          </div>
          <div
            className={`grow flex-col ${
              rightViewMode === "TABLE" ? "flex" : "hidden"
            }`}
          >
            <TableView
              tableData={tableData}
              setTableConfig={setTableConfig}
              tableConfig={tableConfig}
              pluginMode={pluginMode}
              pluginJs={js}
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
                          ${sanitizeComponentNames(js)}
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
      <TemplateGenerator
        handleGenerateCode={handleGenerateCode}
        open={isTemplateGeneratorOpen}
        onClose={() => setIsTemplateGeneratorOpen(false)}
      />
      <LoginModal
        open={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
}
