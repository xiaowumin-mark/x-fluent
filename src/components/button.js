import { html, css, LitElement } from 'lit';
import { shear } from "../style/index"
class XFButton extends LitElement {
  static properties = {
    type: {
      type: String
    },
    disabled: {
      type: Boolean
    }
  };

  static styles = [shear, css`
    .default:hover{
      background-color:rgb(249, 249, 251);
    }
    .default:active{
      background-color:rgb(248, 249, 251);
	    border-color:rgb(233, 234, 237);
	    color:rgb(170, 171, 172);
    }
    .default{
      background-color:rgb(253, 253, 254);
      border-color:rgb(233, 234, 237);
	    background-color:rgb(253, 253, 254);
	    border-bottom-color:rgb(208, 209, 211);
    }

    .primary{
      background-color:rgb(0, 103, 192);
	    border-color:rgb(20, 115, 197);
	    border-bottom-color:rgb(0, 62, 115);
	    color:rgb(255, 255, 255);
    }
    .primary:hover{
      background-color:rgb(25, 117, 197);
    }
    .primary:active{
      background-color:rgb(49, 131, 202);
	    border-color:rgb(49, 131, 202);
      
    }

    .primary:disabled{
      background-color:#BFBFBF;
	    border-color:#ffffff;
    }

    .default:disabled{
      border-color:rgb(229, 229, 229);
	    background-color:rgb(245, 245, 245);
	    color:rgb(182, 182, 182);
    }
  `]
  constructor() {
    super();
    // Declare reactive properties
    this.type = 'default';
    this.disabled = false
  }

  render() {
    return html`<button class="shear ${this.type}" ?disabled="${this.disabled}"><slot></slot></button>`;
  }
}

customElements.define('xf-button', XFButton);
export { XFButton };
