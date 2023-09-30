import { Dialog } from "@headlessui/react";
import { useState, useEffect } from "react";
import { PluginMode, Theme } from "../utils/types";
import { BsSun, BsMoon, BsGear, BsCodeSlash } from "react-icons/bs";
import TemplateGeneration from "./TemplateGeneration";

interface Props {
  open: boolean;
  onClose: () => void;
  pluginName: string;
  pluginType: PluginMode;
  theme: Theme;
  handleConfirmSettings: ({
    pluginName,
    pluginType,
    theme,
  }: {
    pluginName: string;
    pluginType: PluginMode;
    theme: Theme;
  }) => void;
  handleGenerateCode: (code: string) => void;
}

export default function Menu({
  open,
  onClose,
  pluginName: currentPluginName,
  theme: currentTheme,
  pluginType: currentPluginType,
  handleConfirmSettings,
  handleGenerateCode,
}: Props) {
  const [pluginName, setPluginName] = useState("");
  const [theme, setTheme] = useState<Theme>("LIGHT");
  const [pluginType, setPluginType] = useState<PluginMode>("TABLE");
  const [tabMode, setTabMode] = useState<"SETTINGS" | "CODE_GENERATION">(
    "SETTINGS"
  );
  useEffect(() => {
    setPluginName(currentPluginName);
    setTheme(currentTheme);
    setPluginType(currentPluginType);
  }, [currentPluginName, currentTheme, currentPluginType]);
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="mx-auto rounded bg-zinc-600 text-white p-4 min-w-[600px] max-w-full min-h-[600px] flex flex-col">
          <Dialog.Title className="font-medium mb-4 text-lg">Menu</Dialog.Title>
          <div className="mb-4 bg-zinc-700 flex">
            <button
              className={`${
                tabMode === "SETTINGS" ? "bg-zinc-900" : "bg-zinc-800"
              } hover:bg-zinc-900 px-4 py-2 flex items-center gap-2`}
              onClick={() => setTabMode("SETTINGS")}
            >
              <BsGear /> <span>Settings</span>
            </button>
            <button
              className={`${
                tabMode === "CODE_GENERATION" ? "bg-zinc-900" : "bg-zinc-800"
              } hover:bg-zinc-900 px-4 py-2 flex items-center gap-2`}
              onClick={() => setTabMode("CODE_GENERATION")}
            >
              <BsCodeSlash /> <span>Code</span>
            </button>
            <button className="bg-zinc-800 hover:bg-zinc-900 px-4 py-2">
              Tab1
            </button>
          </div>

          {tabMode === "SETTINGS" && (
            <>
              <div className="bg-zinc-700 p-4 rounded-md mb-4">
                <label
                  htmlFor="plugin_name"
                  className="block mb-2 text-sm font-medium "
                >
                  Plugin Name
                </label>
                <input
                  type="text"
                  value={pluginName}
                  onChange={(e) => setPluginName(e.target.value)}
                  id="plugin_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-vs-dark focus:border-vs-dark block w-full p-2.5 outline-none"
                  placeholder="Plugin Name"
                />
              </div>
              <div className="bg-zinc-700 p-4 rounded-md flex justify-between items-center mb-4">
                <div className="text-sm font-medium ">Plugin Theme</div>
                <div className="bg-zinc-800 p-2 rounded-lg flex">
                  <button
                    onClick={() => setTheme("LIGHT")}
                    className={`transition-all duration-75 rounded-lg px-4 py-2 ${
                      theme === "LIGHT" ? "bg-white text-vs-dark" : ""
                    }`}
                  >
                    <BsSun />
                  </button>
                  <button
                    onClick={() => setTheme("DARK")}
                    className={`transition-all duration-75 rounded-lg px-4 py-2 ${
                      theme === "DARK" ? "bg-white text-vs-dark" : ""
                    }`}
                  >
                    <BsMoon />
                  </button>
                </div>
              </div>
              <div className="bg-zinc-700 p-4 rounded-md flex justify-between items-center mb-4">
                <div className="text-sm font-medium ">Plugin Type</div>
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

              <div className="flex justify-end">
                <button
                  className="bg-zinc-800 px-4 py-2 rounded-md"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  className="bg-zinc-800 px-4 py-2 rounded-md"
                  onClick={() =>
                    handleConfirmSettings({ pluginName, pluginType, theme })
                  }
                >
                  Save Settings
                </button>
              </div>
            </>
          )}
          {tabMode === "CODE_GENERATION" && (
            <div className="grow">
              <TemplateGeneration handleGenerateCode={handleGenerateCode} />
            </div>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
