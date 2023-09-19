import CodeEditor, { OnChange } from "@monaco-editor/react";
import { useState, useRef, useEffect } from "react";
import { BsGear, BsViewStacked, BsChevronDown, BsPencil } from "react-icons/bs";

export default function Editor() {
  const handleEditorChange: OnChange = (value) => {
    setJs(value || "");
  };

  const [js, setJs] = useState("");
  const [pluginName, setPluginName] = useState("Your Plugin Name");
  const [isEditingPluginName, setIsEditingPluginName] = useState(false);

  const pluginNameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (pluginNameInputRef.current && isEditingPluginName) {
      pluginNameInputRef.current.focus();
    }
  }, [isEditingPluginName, pluginNameInputRef]);

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
        <div className="flex gap-2 items-center">
          <div className="bg-zinc-800 rounded-lg px-4 py-2 flex gap-2 items-center">
            <div>Columns</div>
            <BsChevronDown />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-6 flex flex-col">
          <div className="flex text-white text-sm bg-zinc-700">
            <button className="hover:bg-vs-dark px-4 py-2 bg-zinc-800 flex gap-2 items-center">
              <BsViewStacked /> <span>View</span>
            </button>
            <button className="hover:bg-vs-dark px-4 py-2 bg-zinc-800 flex gap-2 items-center">
              <BsGear /> <span>Configuration</span>
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
            <button className="hover:bg-vs-dark px-4 py-2 bg-zinc-800 flex gap-2 items-center">
              <BsViewStacked /> <span>Table Data</span>
            </button>
            <button className="hover:bg-vs-dark px-4 py-2 bg-zinc-800 flex gap-2 items-center">
              <BsGear /> <span>Plugin</span>
            </button>
          </div>
          <iframe
            className="bg-white grow"
            srcDoc={`
                <html>
                    <head>
                        <script>${js}</script>
                    </head>
                    <body>
                    <custom-element></custom-element>
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
