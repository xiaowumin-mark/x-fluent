import { html, css, LitElement } from 'lit';

class XFDropDownButton extends LitElement {
    static properties = {
        disabled: {
            type: Boolean
        }
    };

    static styles = css`
    .ddb_main {
        border:none;
	    border-style:solid;
        border-width:0.5px;
        border-radius:4px;
        font-size:12px;
        padding:4px 10px;
        padding-right:0px;
        font-family:"Segoe";
        transition:all .1s;
        cursor:default;
        display:inline-block;
    }
    .ddb_main:hover{
      background-color:rgb(249, 249, 251);
    }
    .ddb_main:active{
      background-color:rgb(248, 249, 251);
	    border-color:rgb(233, 234, 237);
	    color:rgb(170, 171, 172);
    }
    .ddb_main{
        background-color:rgb(253, 253, 254);
        border-color:rgb(233, 234, 237);
	    background-color:rgb(253, 253, 254);
	    border-bottom-color:rgb(208, 209, 211);
    }
    .ddb_main span{
        float:left
    }
    .disabled{
        border-color:rgb(229, 229, 229);
	    background-color:rgb(245, 245, 245);
	    color:rgb(182, 182, 182);
        pointer-events: none;
    }
    .ddb_right_btn{
        height:100%;
        display:flex;
        align-self:center
    }
  `;
    constructor() {
        super();
        this.disabled = false
    }

    render() {
        //return html`<button class="${this.type}" ?disabled="${this.disabled}">
        //    <slot></slot>
        //</button>`;
        return html`
            <div class="ddb_main ${this.disabled? "disabled" : ""}" >
                <span><slot></slot></span>
                <span class="ddb_right_btn">
                    <svg width="12" height="12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M36 18L24 30L12 18" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </span>
            </div>
        `
    }
}

customElements.define('xf-drop-down-button', XFDropDownButton);
export { XFDropDownButton };
