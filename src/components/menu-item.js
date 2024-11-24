import { html, css, LitElement } from 'lit';
import { shear, unselectable } from "../style/index"
class XFMenuItem extends LitElement {
    static properties = {
        tip: { type: Boolean },
        value: {
            type: String,
            reflect: true,
            attribute: "value"
        }
    };
    static styles = [unselectable, shear, css`
        xf-menu-item{

            color:var(--xf-text-color)
          }
    :host{
        --fx-tip-height:50%;
    }
    .menu-item{
        width:auto;
        min-height:30px;
        min-width:100px;
        border-radius:5px;
        margin-top:3px;
        margin-bottom:3px;
        transition:all 0.2s;
        box-sizing:border-box;
        padding:7px 10px;
        position:relative;

    }
    .menu-item:hover{
        background-color:#00000010;
    }
    .menu-item:active{
        background-color:#00000020;
    }
    .menu-item:active {
        --fx-tip-height:30%;
    }
    .tip{
        padding-left:10px;
    }
    .tip::before{
        content:"";
        position:absolute;
        left:0;
        top:50%;
        width:2.5px;
        height:var(--fx-tip-height);
        transform:translateY(-50%);
        border-radius:5px;
        background-color:var(--xf-primary-color);
        transition:all 0.2s;
    }

  `]
    constructor() {
        super();
        this.tip = false;


    }

    render() {
        return html`
        <div class="menu-item unselectable ${this.tip ? "tip" : ""}">
            <slot></slot>
        </div>
    `;
    }
}

customElements.define('xf-menu-item', XFMenuItem);
export { XFMenuItem };
