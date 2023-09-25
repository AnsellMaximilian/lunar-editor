import { jsonToAttribute } from "./attributes";
import { PluginMode, TableConfig, TableData } from "./types";

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
        overflow: auto;
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
    if(customElements.get("outerbase-plugin-configuration")){
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
    }else {
      config.remove();
      const pluginTable = document.createElement("outerbase-plugin-table");
      pluginTable.setAttribute("configuration", JSON.stringify({}));
      ${
        tableData
          ? `pluginTable.setAttribute("tableValue", "${jsonToAttribute(
              tableData
            )}");`
          : ""
      }
      document.body.appendChild(pluginTable)
    }
`;
};

export const columnPluginStyles = `
    body {margin: 0}
    #plugin-table-container {
        position: relative;
        overflow-x: auto;
    }
    #plugin-table {
        width: 100%;
        border-collapse: collapse;
        border: 1px solid rgb(212 212 216);
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        white-space: nowrap;
    }

    #plugin-table th, #plugin-table td {
        padding: 0.25rem 0.5rem;
        border: 1px solid rgb(212 212 216);
        text-align: left;
    }

    #plugin-table .plugin-table__index {
        text-align: center;
    }

    #plugin-table th > div{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    #plugin-table th button {
        background-color: transparent;
        outline: none;
        border: none;
        padding: 0;
        font-size: 20px;
        cursor: pointer;
    }

    #plugin-editor-component {
      position: absolute;
      z-index: 25;
      top: 0;
      left: 0;
    }
`;

export const pluginTable = (
  tableConfig: TableConfig,
  pluginMode: PluginMode,
  tableData: TableData,
  js: string
) => {
  return `
    <html>
        <head>
            <script>
              ${sanitizeComponentNames(js)}
            </script>
            <style>
                ${columnPluginStyles}
            </style>
        </head>
        <body style="position: relative;">
          <div id="plugin-table-container">
            <table id="plugin-table">
                <thead>
                <tr>
                    <th class="plugin-table__index">#</th>
                    ${tableConfig.columnConfigs
                      .map(
                        (col) => `
                    <th col_id="${col.id}" class="plugin-table__column-header">
                        <div>
                            <span>${col.name}</span>
                            ${
                              pluginMode === "COLUMN"
                                ? `
                                <button>+</button>
                            `
                                : ""
                            }
                        </div>
                    </th>
                    `
                      )
                      .join("")}
                </tr>
                </thead>
                <tbody>
                    ${tableData
                      .map(
                        (row, i) => `
                        <tr>
                            <td class="plugin-table__index">
                            ${i + 1}
                            </td>
                            ${tableConfig.columnConfigs
                              .map(
                                (col) => `
                            <td col_id="${col.id}" cellValue="${row[col.name]}">
                                ${row[col.name]}
                            </td>
                            `
                              )
                              .join("")}
                        </tr>
                    `
                      )
                      .join("")}
                </tbody>
            </table>
          </div>
          <script>
            const columnHeaders = document.querySelectorAll(".plugin-table__column-header");
            columnHeaders.forEach((header) => {
              const toggleButton = header.querySelector("button");
              const colId = header.getAttribute("col_id");
              const cells = document.querySelectorAll(\`td[col_id="\${colId}"]\`);
              toggleButton.addEventListener('click', function() {
                const pluginNotApplied = toggleButton.textContent.trim() === "+";
                toggleButton.textContent = pluginNotApplied  ? "\u00D7" : "+";
                if(pluginNotApplied){
                  cells.forEach(cell => {
                      const renderPluginCell = (cellValue) => {
                        const pluginCell = document.createElement("outerbase-plugin-cell");
                        const pluginContainer = document.createElement("div");
                        pluginContainer.appendChild(pluginCell)
                        cell.innerHTML = "";
                        pluginCell.setAttribute("cellValue", cellValue)
                        cell.appendChild(pluginContainer)
                        pluginCell.addEventListener("click", function(e){
                          e.preventDefault();
                          e.stopPropagation();
                        });

                        return pluginCell
                      }

                      const pluginCell = renderPluginCell(cell.getAttribute("cellValue"))

                      pluginCell.addEventListener("custom-change", (e) => {
                        const {action, value} = e.detail;
                        if(action.toLowerCase() === "onedit"){
                          document.querySelector("outerbase-plugin-editor")?.remove();
                          const pluginRect = pluginCell.getBoundingClientRect();
                          const newEditor = document.createElement("outerbase-plugin-editor");
                          newEditor.setAttribute("cellValue", cell.getAttribute("cellValue"));
                          newEditor.style.left = pluginRect.left - 8 + "px";
                          newEditor.style.top = pluginRect.bottom + 4 + "px";
                          newEditor.id = "plugin-editor-component"
                          newEditor.addEventListener("click", function(e){
                            e.preventDefault();
                            e.stopPropagation();
                          })
                          document.body.appendChild(newEditor);
                        }else if(action.toLowerCase() === "onstopedit"){
                          document.querySelector("outerbase-plugin-editor")?.remove();
                        }else if(action.toLowerCase() === "oncanceledit"){
                          document.querySelector("outerbase-plugin-editor")?.remove();
                        }else if(action.toLowerCase() === "updatecell"){
                          renderPluginCell(value);
                        }
                      })
                  } )
                }else {
                  cells.forEach(cell => cell.innerHTML =  cell.getAttribute("cellValue") )
                }
              });
              document.addEventListener("click", function(event){
               document.querySelector("outerbase-plugin-editor")?.remove();
              })
            });

            
          </script>
        </body>

    </html>
  `;
};

export const sanitizeComponentNames = (code: string) =>
  code.replace(/-\$PLUGIN_ID/g, "");
