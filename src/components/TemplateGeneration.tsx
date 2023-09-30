import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { PluginMode } from "../utils/types";
import { generatePluginCode } from "../utils/pluginCode";

interface Props {
  open: boolean;
  onClose: () => void;
  handleGenerateCode: (code: string) => void;
}

export default function TemplateGeneration({
  open,
  onClose,
  handleGenerateCode,
}: Props) {
  const [pluginType, setPluginType] = useState<PluginMode>("COLUMN");
  const [includeEditorView, setIncludeEditorView] = useState(false);
  const [includeConfigView, setIncludeConfigView] = useState(false);
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="mx-auto rounded bg-zinc-600 text-white p-4 min-w-[400px] max-w-full">
          <Dialog.Title className="font-medium mb-4 text-lg">
            Template Generator
          </Dialog.Title>
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
              <div className="bg-zinc-700 p-4 rounded-md">
                <div className="block mb-2 text-sm font-medium ">
                  Plugin Type
                </div>
                <div className="flex gap-2 items-center">
                  <div className="flex items-center">
                    <input
                      id="column-radio"
                      type="radio"
                      checked={pluginType === "COLUMN"}
                      onChange={(e) =>
                        e.target.checked && setPluginType("COLUMN")
                      }
                      value="COLUMN"
                      name="column"
                      className="w-4 h-4 bg-gray-100 border-gray-300 outline-none"
                    />
                    <label
                      htmlFor="column-radio"
                      className="ml-2 text-sm font-medium"
                    >
                      Column
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="table-radio"
                      type="radio"
                      checked={pluginType === "TABLE"}
                      onChange={(e) =>
                        e.target.checked && setPluginType("TABLE")
                      }
                      value="TABLE"
                      name="table"
                      className="w-4 h-4 bg-gray-100 border-gray-300 outline-none"
                    />
                    <label
                      htmlFor="table-radio"
                      className="ml-2 text-sm font-medium"
                    >
                      Table
                    </label>
                  </div>
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
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
