import { html, css, LitElement } from 'lit';
import { shear } from "../style/index"
class XFToggleButton extends LitElement {
    static properties = {
        checked: {
            type: Boolean,
            reflect: true,
            attribute: 'checked'
        },
        disabled: {
            type: Boolean
        },
        // change事件

    };

    static styles = [shear, css`
        xf-toggle-button{
            color:var(--xf-text-color)
        }
        .default:hover{
          background-color:var(--xf-default-hover-color);
        }
        .default:active{
          background-color:var(--xf-default-active-color);
            border-color:var(--xf-border-active-color);
            color:var(--xf-text-active-color);
        }
        .default{
          background-color:var(--xf-default-color);
        }

        .primary{
            background-color:var(--xf-primary-color);
              border-color:var(--xf-primary-color);
              color:var(--xf-text-primary-color);
        }
        .primary:hover{
          background-color:var(--xf-hover-color);
        }
        .primary:active{
          background-color:var(--xf-active-color);
          
        }
        .primary:disabled{
          background-color:#BFBFBF;
            border-color:#e4e4e4;
          color:#e4e4e4
        }
    
        .default:disabled{
          border-color:var(--xf-disabled-border-color);
            background-color:var(--xf-disabled-color);
            color:var(--xf-disabled-text-color);
        }
  `]
    constructor() {
        super();
        // Declare reactive properties
        this.type = 'default';
        this.checked = false;
        this.disabled = false
    }

    render() {
        return html`<button @click="${() => {
            this.checked = !this.checked
            this.dispatchEvent(new CustomEvent('change', { detail: this.checked }))
        }}" class="shear ${this.checked ? "primary" : "default"}" ?disabled="${this.disabled}" ?checked="${this.checked}"><slot></slot></button>`;
    }


}

customElements.define('xf-toggle-button', XFToggleButton);
export { XFToggleButton };
