import { html, css, LitElement } from 'lit';
import { shear } from "../style/index"
class XFRadio extends LitElement {
    static properties = {
        type: {
            type: String
        },
        disabled: {
            type: Boolean
        },
        name: {
            type: String,
            attribute: 'name',
            reflect: true
        }
    };

    static styles = [shear, css`
    
  `]
    constructor() {
        super();
        // Declare reactive properties
        this.type = 'default';
        this.disabled = false
        this.name = 'default'
    }

    render() {
        return html`
      <input id="xf_radio" class="shear ${this.type}" ?disabled="${this.disabled}" type="radio" .name="${this.name}">
      <label for="xf_radio"><slot></slot></label>
    `;
    }
}

customElements.define('xf-radio', XFRadio);
export { XFRadio };


class XFRadioButton extends LitElement {
  static properties = {
    name: { type: String },
    value: { type: String },
    selectedValue: { type: String },
    options: { type: Array },
    disabled: { type: Boolean }
  };

  static styles = css`
    .radio-container {
      display: flex;
      flex-direction: column;
    }
    .radio-item {
      margin-bottom: 5px;
    }
    .radio-item input[type="radio"] {
      margin-right: 5px;
    }
    .radio-item input[disabled] {
      cursor: not-allowed;
    }
  `;

  constructor() {
    super();
    this.name = '';
    this.value = '';
    this.selectedValue = '';
    this.options = [];
    this.disabled = false;
  }

  render() {
    return html`
      <div class="radio-container">
        ${this.options.map(
          (option) => html`
            <label class="radio-item">
              <input
                type="radio"
                name="${this.name}"
                .value="${option}"
                .checked="${this.selectedValue === option}"
                ?disabled="${this.disabled}"
                @change="${this._onSelect}"
              />
              ${option}
            </label>
          `
        )}
      </div>
    `;
  }

  _onSelect(event) {
    this.selectedValue = event.target.value;
    this.dispatchEvent(new CustomEvent('value-changed', {
      detail: { value: this.selectedValue }
    }));
  }
}

customElements.define('xf-radio-button', XFRadioButton);
export { XFRadioButton };
