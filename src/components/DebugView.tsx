import { sanitizeComponentNames } from "../utils/output";
import { PluginMode } from "../utils/types";

interface Props {
  code: string;
  pluginMode: PluginMode;
}

export default function DebugView({ code, pluginMode }: Props) {
  return (
    <div className="bg-white grow flex-col">
      <iframe
        className="h-full"
        srcDoc={`
<html>
    <head>
        <style>
            #plugin-debug {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                padding: 1rem;
                border: 1px  rgb(161 161 170) solid;
                border-radius: 0.375rem;
                background-color: white;
                overflow-x: auto;
                box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
            }

            #plugin-debug__title {
                font-size: 1.25rem;
                line-height: 1.75rem;
                margin-bottom: 1rem;
                font-weight: 700;
            }

            #plugin-debug__checklist {
                display: flex;
                gap: 0.5rem;
                flex-direction: column;
            }

            .plugin-debug__item {
                display: flex;
                border-radius: 0.375rem;
                overflow: hidden;
                white-space: nowrap;
            }

            .plugin-debug__item.success {
                border: rgb(22 101 52) solid 1px;
            }
            .plugin-debug__item.error {
                border: rgb(153 27 27) solid 1px;
            }
            .plugin-debug__item.warning {
                border: rgb(154 52 18) solid 1px;
            }

            .plugin-debug__indicator {
                padding: 0.5rem;
                display: flex;
                font-weight: 700;
                justify-content: center;
                align-items: center;
                min-width: 75px;
            }

            .plugin-debug__item.success .plugin-debug__indicator{
                background-color: rgb(74 222 128);
                color: rgb(22 101 52);
            }

            .plugin-debug__item.error .plugin-debug__indicator{
                background-color: rgb(248 113 113);
                color: rgb(153 27 27);
            }

            .plugin-debug__item.warning .plugin-debug__indicator{
                background-color: rgb(251 146 60);
                color: rgb(154 52 18);
            }

            .plugin-debug__content {
                flex-grow: 1;
                padding: 0.5rem;
            }

            .plugin-debug__message {
                font-weight: 700;
            }
            .plugin-debug__description {
                font-size: 0.875rem;
                line-height: 1.25rem;
            }
        </style>
        <script>
          ${sanitizeComponentNames(code)}
        </script>
    </head>
    <body>
        <div id="plugin-debug">
            <div id="plugin-debug__title">Debugging: ${
              pluginMode === "COLUMN" ? "Column" : "Table"
            } Plugin</div>
            <div id="plugin-debug__checklist">

            </div>
        </div>
        <script>
        const pluginMode = "${pluginMode}";
        const debugs = [
            {
              successMessage: "Plugin Cell Found",
              successDescription:
                "You have defined an \`outerbase-plugin-cell-$PLUGIN_ID\` component.",
              errorMessage: "Plugin Cell Not Found",
              errorDescription:
                "Make sure to define an \`outerbase-plugin-cell-$PLUGIN_ID\` component.",
              warning: false,
              validator: () => {
                return customElements.get("outerbase-plugin-cell");
              },
              type: "COLUMN",
            },
            {
              successMessage: "Plugin Table Found",
              successDescription:
                "You have defined an \`outerbase-plugin-table-$PLUGIN_ID\` component.",
              errorMessage: "Plugin Table Not Found",
              errorDescription:
                "Make sure to define an \`outerbase-plugin-table-$PLUGIN_ID\` component.",
              warning: false,
              validator: () => {
                return customElements.get("outerbase-plugin-table");
              },
              type: "TABLE",
            },
            {
              successMessage: "Plugin Configuration Found",
              successDescription:
                "You have defined an \`outerbase-plugin-configuration-$PLUGIN_ID\` component.",
              errorMessage: "Plugin Configuration Not Found",
              errorDescription:
                "If your plugin needs configuration, define an \`outerbase-plugin-configuration-$PLUGIN_ID\` component.",
              warning: true,
              validator: () => {
                return customElements.get("outerbase-plugin-configuration");
              },
              type: "BOTH",
            },
          ];
          const checklist = document.querySelector("#plugin-debug__checklist");
          debugs.forEach(debug => {
            const debugItem = document.createElement("div");
            debugItem.classList.add("plugin-debug__item")
            const debugIndicator = document.createElement("div");
            debugIndicator.classList.add("plugin-debug__indicator")
            const debugContent = document.createElement("div");
            debugContent.classList.add("plugin-debug__content")
            const debugContentMessage = document.createElement("div");
            debugContentMessage.classList.add("plugin-debug__message")
            const debugContentDescription = document.createElement("div");
            debugContentDescription.classList.add("plugin-debug__description")
            const debugResult = debug.validator();
            if(debugResult){
                debugIndicator.textContent = "\u2713";
                debugContentMessage.textContent = debug.successMessage;
                debugContentDescription.textContent = debug.successDescription;
            }else { 
                debugIndicator.textContent = "\u00D7";
                debugContentMessage.textContent = debug.errorMessage;
                debugContentDescription.textContent = debug.errorDescription;
            }
            if(debug.warning) {
                debugIndicator.textContent = "!";
            }

            debugItem.classList.add(debug.warning ? "warning" : debugResult ? "success" : "error");

            debugContent.appendChild(debugContentMessage);
            debugContent.appendChild(debugContentDescription);

            debugItem.appendChild(debugIndicator);
            debugItem.appendChild(debugContent);
            if(debug.type === "${pluginMode}" || debug.type === "BOTH") checklist.appendChild(debugItem);
          })
        </script>
    </body>
</html>
`}
        title="output"
        sandbox="allow-scripts"
        width="100%"
      ></iframe>
    </div>
  );
}
