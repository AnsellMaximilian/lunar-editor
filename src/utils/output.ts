import { jsonToAttribute } from "./attributes";
import { TableData } from "./types";

export const configHtml = (tableData: TableData | null) => `
<div id="config">
    <div id="config__backdrop">
    <div id="config__container">
        <div id="config__title">Configure Plugin</div>
        <div id="config__content">
            <outerbase-plugin-configuration 
                configuration="{}"
                ${tableData ? `tableValue="${jsonToAttribute(tableData)}"` : ""}
                >
            </outerbase-plugin-configuration>
        </div>
        
    </div>
    </div>
</div>
`;

export const configCss = `
    #config {
        position: fixed;
        inset: 0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        overflow: scroll;
    }
    
    #config__backdrop {
        position: absolute;
        inset: 0;
        background-color: rgba(255, 255, 255, 0.5);
        backdrop-filter: blur(12px);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem;
    }
    
    #config__container {
        max-width: 100%;
        max-height: 100%;
    }

    
    #config__title {
        padding: 1rem;
        border-bottom: .8px rgb(208, 208, 208) solid;
    }
`;

export const customEventListenersJs = (tableData: TableData | null) => {
  return `
    const config = document.querySelector("#config");
    const pluginConfiguration = document.querySelector("outerbase-plugin-configuration");
    pluginConfiguration.addEventListener("custom-change", (e) => {
        const {action, value} = e.detail;
        pluginConfiguration.setAttribute("configuration", JSON.stringify(value));
        config.style.display = "none";
        const pluginTable = document.createElement("outerbase-plugin-table");
        pluginTable.setAttribute("configuration", JSON.stringify(value));
        ${
          tableData
            ? `pluginTable.setAttribute("tableValue", "${jsonToAttribute(
                tableData
              )}");`
            : ""
        }
        document.body.appendChild(pluginTable)
        
    })
`;
};
