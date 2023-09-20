import { jsonToAttribute } from "./attributes";
import { TableData } from "./types";

export const configHtml = (tableData: TableData | null) => `
<div id="config">
    <div id="config__backdrop">
    <div id="config__container">
        <div id="config__title">Configure Plugin</div>
        <div id="config__content">
            <outerbase-plugin-table-configuration 
                configuration="{}"
                ${tableData ? `tableValue="${jsonToAttribute(tableData)}"` : ""}
                >
            </outerbase-plugin-table-configuration>
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
