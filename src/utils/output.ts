import { jsonToAttribute } from "./attributes";
import { PluginMode, TableConfig, TableData, Theme } from "./types";

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

export const customEventListenersJs = (
  tableData: TableData,
  tableConfig: TableConfig,
  theme: Theme
) => {
  return `
    const tableData = ${JSON.stringify(tableData)};
    const colConfig = ${JSON.stringify(tableConfig.columnConfigs)};
    const metadata = {
      "offset":1,"limit":50,"page":1,"pageCount":Math.ceil(tableData.length / 50),"count":tableData.length,"theme":"${theme.toLowerCase()}"
    };

    const createPluginTable = () => {
      const pluginTable = document.createElement("outerbase-plugin-table");
      pluginTable.setAttribute("metadata", JSON.stringify(metadata));
      pluginTable.setAttribute("tableValue", JSON.stringify(tableData.slice(50 * (metadata.page - 1), 50 * metadata.page)));
      return pluginTable;
    }
    
    const addPluginTableListners = (pluginTable) => {
      pluginTable.addEventListener("custom-change", (e) => {
        const {action, value} = e.detail;
         if(action.toLowerCase() === "getnextpage"){
          const oldPluginTable = document.querySelector("outerbase-plugin-table");

          if(metadata.page < metadata.pageCount){
            metadata.page++
          }
          const pluginTable = createPluginTable();
          if(oldPluginTable){
            oldPluginTable.remove();
            pluginTable.setAttribute("configuration", oldPluginTable.getAttribute("configuration"));
          }
          addPluginTableListners(pluginTable);
          document.body.appendChild(pluginTable)
        }else if(action.toLowerCase() === "getpreviouspage"){
          const oldPluginTable = document.querySelector("outerbase-plugin-table");
          if(metadata.page > 1){
            metadata.page--
          }
          const pluginTable = createPluginTable();
          if(oldPluginTable){
            oldPluginTable.remove();
            pluginTable.setAttribute("configuration", oldPluginTable.getAttribute("configuration"));
          }
          addPluginTableListners(pluginTable);
          document.body.appendChild(pluginTable);
        }
      })
    }


    const config = document.querySelector("#config");
    const pluginConfiguration = document.querySelector("outerbase-plugin-configuration");
    if(customElements.get("outerbase-plugin-configuration")){
      pluginConfiguration.setAttribute("metadata", JSON.stringify(metadata))
      pluginConfiguration.addEventListener("custom-change", (e) => {
        const {action, value} = e.detail;
        if(action.toLowerCase() === "onsave"){
          pluginConfiguration.setAttribute("configuration", JSON.stringify(value));
          config.style.display = "none";
          const pluginTable = createPluginTable();
          pluginTable.setAttribute("configuration", JSON.stringify(value));
          addPluginTableListners(pluginTable);
          document.body.appendChild(pluginTable)
        } 
      })
    }else {
      config.remove();
      const pluginTable = document.createElement("outerbase-plugin-table");
      pluginTable.setAttribute("configuration", JSON.stringify({}));
      ${`pluginTable.setAttribute("tableValue", "${jsonToAttribute(
        tableData
      )}");`}
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

    #table-controls {
      display: flex;
      justify-content: end;
      margin-top: 1rem;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      gap: 1rem;
    }

    #table-controls__page-controls{
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
`;

export const pluginTable = (
  tableConfig: TableConfig,
  pluginMode: PluginMode,
  tableData: TableData,
  js: string,
  theme: Theme = "LIGHT"
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
                </tbody>
            </table>
            <div id="table-controls">
                <div id="table-controls__summary"></div>
                <div id="table-controls__page-controls">
                  <button id="table-controls__prev-btn">&lt;</button>
                  <div>3</div>
                  <button id="table-controls__next-btn">&gt;</button>
                </div>
            </div>
          </div>
          <script>
            const tableData = ${JSON.stringify(tableData)};
            const colConfig = ${JSON.stringify(tableConfig.columnConfigs)};
            const tableBody = document.querySelector("#plugin-table tbody");
            const tableSummary = document.querySelector("#table-controls__summary");
            const metadata = {
              "offset":1,"limit":50,"page":1,"pageCount":Math.ceil(tableData.length / 50),"count":tableData.length,"theme":"${theme.toLocaleLowerCase()}"
            }
            
            const generateTableBody = function(){
              tableBody.innerHTML = "";
              tableData.slice(50 * (metadata.page - 1), 50 * metadata.page).forEach((row, i) => {
                const tr = document.createElement("tr");
                const indexCol = document.createElement("td");
                indexCol.textContent = i+1;
                indexCol.classList.add("plugin-table__index");
                tr.appendChild(indexCol);
                colConfig.forEach((col, j) => {
                  const td = document.createElement("td");
                  td.setAttribute("col_id", col.id);
                  td.setAttribute("cellValue", row[col.name]);
                  td.textContent = row[col.name];
                  tr.appendChild(td);
                })
                tableBody.append(tr);
              })
              tableSummary.textContent = "Viewing " + (50 * (metadata.page - 1) + 1) + " - " + Math.min(50, metadata.count) * metadata.page + " of " + metadata.count;
            }

            generateTableBody();

            const prevBtn = document.querySelector("#table-controls__prev-btn");
            const nextBtn = document.querySelector("#table-controls__next-btn");

            nextBtn.addEventListener("click", function(){
              if(metadata.page < metadata.pageCount){
                metadata.page++
              }
              generateTableBody();

            })

            prevBtn.addEventListener("click", function(){
              if(metadata.page > 1 ){
                metadata.page--
              }
              generateTableBody();

            })


            const columnHeaders = document.querySelectorAll(".plugin-table__column-header");
            columnHeaders.forEach((header) => {
              const toggleButton = header.querySelector("button");
              const colId = header.getAttribute("col_id");
              const cells = document.querySelectorAll(\`td[col_id="\${colId}"]\`);
              toggleButton.addEventListener('click', function() {
                const pluginNotApplied = toggleButton.textContent.trim() === "+";
                toggleButton.textContent = pluginNotApplied  ? "\u00D7" : "+";
                if(pluginNotApplied){
                  cells.forEach((cell, i) => {
                      const renderPluginCell = (cellValue) => {
                        const pluginCell = document.createElement("outerbase-plugin-cell");
                        const pluginContainer = document.createElement("div");
                        pluginContainer.appendChild(pluginCell)
                        cell.innerHTML = "";
                        pluginCell.setAttribute("cellValue", cellValue);
                        pluginCell.setAttribute("metadata", JSON.stringify(metadata));
                        pluginCell.setAttribute("tableValue", JSON.stringify(tableData.slice(50 * (metadata.page - 1), 50 * metadata.page)));
                        pluginCell.setAttribute("rowValue", JSON.stringify(tableData.slice(50 * (metadata.page - 1), 50 * metadata.page)[i]));
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
                          newEditor.setAttribute("tableValue", JSON.stringify(tableData.slice(50 * (metadata.page - 1), 50 * metadata.page)));
                          newEditor.setAttribute("rowValue", JSON.stringify(tableData.slice(50 * (metadata.page - 1), 50 * metadata.page)[i]));
                          newEditor.style.left = pluginRect.left - 8 + "px";
                          newEditor.style.top = pluginRect.bottom + 4 + "px";
                          newEditor.id = "plugin-editor-component"
                          newEditor.addEventListener("click", function(e){
                            e.preventDefault();
                            e.stopPropagation();
                          })
                          newEditor.addEventListener("custom-change", function(e){
                            const {action, value} = e.detail;
                            if(action.toLowerCase() === "onstopedit"){
                              document.querySelector("outerbase-plugin-editor")?.remove();
                            }else if(action.toLowerCase() === "oncanceledit"){
                              document.querySelector("outerbase-plugin-editor")?.remove();
                            }else if(action.toLowerCase() === "updatecell"){
                              renderPluginCell(value);
                            }
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
