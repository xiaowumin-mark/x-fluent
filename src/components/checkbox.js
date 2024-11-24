import { html, css, LitElement } from 'lit';
import { shear } from "../style/index"
class XFChexkbox extends LitElement {
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
    xf-checkbox {
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
      border-radius: 4px;
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
    }
    input:checked {
      background-color: var(--xf-primary-color);
    }
    input:checked::before{
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      background: url('data:image/svg+xml;charset=utf-8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDQ4IDQ4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik00MyAxMUwxNi44NzUgMzdMNSAyNS4xODE4IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+') no-repeat center;
    }
    label {
      vertical-align: middle;
      font-size: 13px;
      font-family:"Segoe";
      margin-left:-7px;
      color:var(--xf-text-color);
    }
    svg{
      filter:var(--xf-svg-color)
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
      <input id="xf_checkbox" type="checkbox" value="${this.value}" @click=${this._onchange} .checked="${this.checked}">
      <label for="xf_checkbox"><slot></slot></label>
    </div>
    `;
  }
  _onchange() {
    if (this.disabled) return;

    this.checked = !this.checked;
    this.dispatchEvent(new CustomEvent('xf-checkbox-change', {
      detail: this,
      bubbles: true, // 确保事件冒泡
      composed: true // 允许事件穿过 shadow DOM 边界
    }));
  }

}

customElements.define('xf-checkbox', XFChexkbox);
export { XFChexkbox };

class XFCheckboxGroup extends LitElement {
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
      <div @xf-checkbox-change="${this._onchange}">
        <slot></slot>
      </div>
    `;
  }
  _onchange(e) {
    const checkboxs = this.querySelectorAll('xf-checkbox');
    let res = [];
    for (let i = 0; i < checkboxs.length; i++) {
      if (checkboxs[i].checked) {
        res.push(checkboxs[i]);
      }
    }


  }
}
customElements.define('xf-chexkbox-group', XFCheckboxGroup);
export { XFCheckboxGroup };
