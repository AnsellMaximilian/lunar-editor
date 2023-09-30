import { useState } from "react";
import { PluginMode } from "../utils/types";
import { generatePluginCode } from "../utils/pluginCode";

interface Props {
  handleGenerateCode: (code: string) => void;
}

export default function TemplateGeneration({ handleGenerateCode }: Props) {
  const [pluginType, setPluginType] = useState<PluginMode>("COLUMN");
  const [includeEditorView, setIncludeEditorView] = useState(false);
  const [includeConfigView, setIncludeConfigView] = useState(false);
  return (
    <div className="">
      <div className="font-medium mb-4 text-lg">Template Generator</div>
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
        role="alert"
      >
        <strong className="font-bold block">Warning</strong>
        <span className="block sm:inline">
          Generating template code will replace the everything you currently
          have in your editor.
        </span>
      </div>
      <div className="mb-4">
        <div className="flex flex-col gap-2">
          <div className="bg-zinc-700 p-4 rounded-md flex justify-between items-center">
            <div className="block mb-2 text-sm font-medium ">Plugin Type</div>
            <div className="rounded-lg flex overflow-hidden">
              <button
                onClick={() => {
                  setPluginType("COLUMN");
                }}
                className={`px-4 py-2 ${
                  pluginType === "COLUMN"
                    ? "bg-zinc-800 hover:bg-zinc-900"
                    : "bg-zinc-600 text-zinc-300 hover:bg-zinc-800"
                }`}
              >
                Column
              </button>
              <button
                onClick={() => setPluginType("TABLE")}
                className={`px-4 py-2 ${
                  pluginType === "TABLE"
                    ? "bg-zinc-800 hover:bg-zinc-900"
                    : "bg-zinc-600 text-zinc-300 hover:bg-zinc-800"
                }`}
              >
                Table
              </button>
            </div>
          </div>
          <div className="bg-zinc-700 p-4 rounded-md">
            <label
              htmlFor="table_name"
              className="block mb-2 text-sm font-medium "
            >
              Components
            </label>
            <div className="flex gap-2">
              {pluginType === "TABLE" && (
                <div className="flex items-center">
                  <input
                    id="config-checkbox"
                    type="checkbox"
                    checked={includeConfigView}
                    onChange={(e) => setIncludeConfigView(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="config-checkbox"
                    className="ml-2 text-sm font-medium dark:text-gray-300"
                  >
                    Config View
                  </label>
                </div>
              )}
              {pluginType === "COLUMN" && (
                <div className="flex items-center">
                  <input
                    id="editor-checkbox"
                    type="checkbox"
                    checked={includeEditorView}
                    onChange={(e) => setIncludeEditorView(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="editor-checkbox"
                    className="ml-2 text-sm font-medium dark:text-gray-300"
                  >
                    Editor View
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="bg-zinc-800 px-4 py-2 rounded-md hover:bg-zinc-900"
          onClick={() =>
            handleGenerateCode(
              generatePluginCode({
                pluginType,
                includeConfigView,
                includeEditorView,
              })
            )
          }
        >
          Generate
        </button>
      </div>
    </div>
  );
}
