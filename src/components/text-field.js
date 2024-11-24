import { html, css, LitElement } from 'lit';
import { shear } from "../style/index"
class XFTextField extends LitElement {
    static properties = {
        type: {
            type: String
        },
        disabled: {
            type: Boolean
        },
        label: {
            type: String
        },
    };

    static styles = [shear, css`
        xf-text-field{
            color:var(--xf-text-color)
          }
        :host {
            --xf-text-field-opacity: 0;
        }
        
        span {
            display: inline-block;
            position: relative;
        }
        
        span:before {
            content: "";
            width: 100%;
            height: 4px;
            background-color: var(--xf-primary-color);
            position: absolute;
            bottom: 1px;
            left:0;
            z-index: 1;
            border-radius: 0 0 4px 4px;
            background: linear-gradient(#ffffff00 50%, var(--xf-primary-color) 50%);
            opacity: var(--xf-text-field-opacity);
            transition: opacity 0.1s;

        }
        input{
            height:32px;
            background-color:var(--xf-default-active-color);
	        border-color:var(--xf-border-active-color);
	        color:var(--xf-text-active-color);
            border-bottom-color:var(--xf-border-bottom-color);
            position: relative;
            box-sizing: border-box;
        }
        input:focus{
            outline: none;
            border-bottom-color:#ffffff00
        }
        input:hover {
            background-color:var(--xf-default-hover-color);
        }
    
  `]
    constructor() {
        super();
        // Declare reactive properties
        this.type = 'default';
        this.disabled = false;
        this.label = '';
    }
    onfocus() {
        this.style.setProperty('--xf-text-field-opacity', 1)
    }
    onblur() {
        this.style.setProperty('--xf-text-field-opacity', 0)
    }
    render() {
        return html`
        <span> 
            <input 
            @focus="${this.onfocus}" 
            @blur="${this.onblur}" 
            type="text" 
            class="shear" 
            ?disabled=${this.disabled}
            placeholder="${this.label}"
            >
        </span>
       
    `;
    }
}

customElements.define('xf-text-field', XFTextField);
export { XFTextField };
