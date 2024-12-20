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
    value: {
      type: String,
      attribute: 'value',
      reflect: true
    },
    checked: {
      type: Boolean,
      attribute: 'checked',
      reflect: true
    },
  };

  static styles = [shear, css`
    xf-radio{

      color:var(--xf-text-color)
    }
    div {
      display: inline-block;
      margin-top: 5px;
      margin-bottom: 5px;
      margin-left: 10px;
      margin-right: 10px;
    }

    input {
      margin-right: 10px;
      width: 18px;
      height: 18px;
      vertical-align: middle;
      border-radius: 50%;
      border: 1px solid #8A8A8A;
      appearance: none;
      display:inline-flex;
      justify-content: center;
      align-items: center;
      transition: background-color 0.2s;
      transform-origin: center;
    }
    input:hover {
      background-color: #00000010;
      transform-origin: center;
    }
    input:checked {
      background-color: var(--xf-primary-color);
      transform-origin: center;
    }
    input:checked::before{
      content: '';
      display: block;
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background-color: var(--xf-text-primary-color);
      transform-origin: center;
      transition: transform 0.2s;
    }
    input:checked:active::before{
      transform-origin: center;
      transform: scale(0);
      
    }
    input:checked:hover::before{
      transform-origin: center;
      transform: scale(1.2);
    }
    label {
      vertical-align: middle;
      font-size: 13px;
      font-family:"Segoe";
      margin-left:-7px;
      color:var(--xf-text-color);
    }
  `]
  constructor() {
    super();
    // Declare reactive properties
    this.type = 'default';
    this.disabled = false;
    this.value = '';
    this.checked = false;
  }

  render() {
    return html`
    <div>
      <input id="xf_radio" type="radio" value="${this.value}" @click=${this._onchange} .checked="${this.checked}">
      <label for="xf_radio"><slot></slot></label>
    </div>
    `;
  }
  _onchange() {
    if (this.disabled) return;

    this.checked = !this.checked;
    this.dispatchEvent(new CustomEvent('xf-radio-change', {
      detail: this,
      bubbles: true, // 确保事件冒泡
      composed: true // 允许事件穿过 shadow DOM 边界
    }));
  }

}

customElements.define('xf-radio', XFRadio);
export { XFRadio };

class XFRadioGroup extends LitElement {
  static properties = {
    name: { type: String },
    selected: { type: String },
  };

  static styles = [shear, css`
  `];

  constructor() {
    super();
    this.name = 'group';
    this.selected = '';
  }


  render() {
    return html`
      <div @xf-radio-change="${this._onchange}">
        <slot></slot>
      </div>
    `;
  }
  _onchange(e) {
    let radio = e.detail;
    const radios = this.querySelectorAll('xf-radio');
    for (let i = 0; i < radios.length; i++) {
      if (radios[i] !== radio) {
        radios[i].checked = false;


      }
    }


  }
}
customElements.define('xf-radio-group', XFRadioGroup);
export { XFRadioGroup };
