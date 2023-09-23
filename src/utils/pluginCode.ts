import { PluginMode } from "./types";

const pluginTable = `
var templateTable = document.createElement('template')
templateTable.innerHTML = \`
<style>
    
</style>

<div id="container">
    
</div>
\`

class OuterbasePluginTable_$PLUGIN_ID extends HTMLElement {
    static get observedAttributes() {
        return privileges
    }

    config = new OuterbasePluginConfig_$PLUGIN_ID({})

    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' })
        this.shadow.appendChild(templateTable.content.cloneNode(true))
    }

    connectedCallback() {
        const encodedTableJSON = this.getAttribute('configuration');
        const decodedTableJSON = encodedTableJSON
            ?.replace(/&quot;/g, '"')
            ?.replace(/&#39;/g, "'");
        const configuration = JSON.parse(decodedTableJSON);

        if (configuration) {
            this.config = new OuterbasePluginConfig_$PLUGIN_ID(
                configuration
            )
        }
    }

    callCustomEvent(data) {
        const event = new CustomEvent('custom-change', {
            detail: data,
            bubbles: true, 
            composed: true 
        });

        this.dispatchEvent(event);
    }

}
`;

const pluginConfigView = `
var templateConfiguration = document.createElement('template')
templateConfiguration.innerHTML = \`
<style>
</style>

<div id="container">
    
</div>
\`

class OuterbasePluginConfiguration_$PLUGIN_ID extends HTMLElement {
    static get observedAttributes() {
        return privileges
    }

    config = new OuterbasePluginConfig_$PLUGIN_ID({})

    constructor() {
        super()

        this.shadow = this.attachShadow({ mode: 'open' })
        this.shadow.appendChild(templateConfiguration.content.cloneNode(true))
    }

    connectedCallback() {
        const encodedTableJSON = this.getAttribute('configuration');
        const decodedTableJSON = encodedTableJSON
            ?.replace(/&quot;/g, '"')
            ?.replace(/&#39;/g, "'");
        const configuration = JSON.parse(decodedTableJSON);

        this.config = new OuterbasePluginConfig_$PLUGIN_ID(
            configuration
        )
    }

    callCustomEvent(data) {
        const event = new CustomEvent('custom-change', {
            detail: data,
            bubbles: true, 
            composed: true 
        });

        this.dispatchEvent(event);
    }
}
`;

const pluginConfiguration = `

class OuterbasePluginConfig_$PLUGIN_ID {
    constructor(object) {}
}

`;

const pluginCell = `
var templateCell_$PLUGIN_ID = document.createElement('template')
templateCell_$PLUGIN_ID.innerHTML = \`
<style>
</style>

<div id="container">
</div>
\`

class OuterbasePluginCell_$PLUGIN_ID extends HTMLElement {
    static get observedAttributes() {
        return privileges
    }

    config = new OuterbasePluginConfig_$PLUGIN_ID({})

    constructor() {
        super()

        this.shadow = this.attachShadow({ mode: 'open' })
        this.shadow.appendChild(templateCell_$PLUGIN_ID.content.cloneNode(true))
    }

    connectedCallback() {
        const encodedTableJSON = this.getAttribute('configuration');
        const decodedTableJSON = encodedTableJSON
            ?.replace(/&quot;/g, '"')
            ?.replace(/&#39;/g, "'");
        const configuration = JSON.parse(decodedTableJSON);

        this.config = new OuterbasePluginConfig_$PLUGIN_ID(
            configuration
        )

    }

    callCustomEvent(data) {
        const event = new CustomEvent('custom-change', {
            detail: data,
            bubbles: true,  
            composed: true  
        });

        this.dispatchEvent(event);
    }
}

`;

const editorView = `
var templateEditor_$PLUGIN_ID = document.createElement('template')
templateEditor_$PLUGIN_ID.innerHTML = \`
<style>
    #container {
        max-width: 400px;
    }

    #image-old {
        width: 100%;
        height: 100%;
    }

    #image {
        background-size: contain;
        background-repeat: no-repeat;
        max-width: 400px;
    }

    #background-image {
        background-repeat: no-repeat;
        background-size: contain;
    }
</style>

<div id="container">
    <div id="background-image">
        <img id="image" style="visibility: hidden;" />
    </div>
</div>
\`

class OuterbasePluginEditor_$PLUGIN_ID extends HTMLElement {
    static get observedAttributes() {
        return privileges
    }

    constructor() {
        super()

        this.shadow = this.attachShadow({ mode: 'open' })
        this.shadow.appendChild(templateEditor_$PLUGIN_ID.content.cloneNode(true))
    }

    connectedCallback() {
        const encodedTableJSON = this.getAttribute('configuration');
        const decodedTableJSON = encodedTableJSON
            ?.replace(/&quot;/g, '"')
            ?.replace(/&#39;/g, "'");
        const configuration = JSON.parse(decodedTableJSON);

        this.config = new OuterbasePluginConfig_$PLUGIN_ID(
            configuration
        )
    }
}
`;

export const generatePluginCode = ({
  pluginType,
  includeConfigView,
  includeEditorView,
}: {
  pluginType: PluginMode;
  includeEditorView: boolean;
  includeConfigView: boolean;
}) => {
  return `
    var privileges = [
        'tableValue',
        'configuration',
    ]

    ${pluginConfiguration}
    
    ${pluginType === "TABLE" ? pluginTable : pluginCell}
    
    ${includeConfigView ? pluginConfigView : ""}
    ${includeEditorView ? editorView : ""}
    
    `;
};
