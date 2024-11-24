import { html, css, LitElement } from 'lit';
import { shear } from "../style/index";

class XFSwitch extends LitElement {
    static properties = {
        checked: { type: Boolean, reflect: true }, // 定义 checked 属性并使其可反射到 DOM 属性
    };

    static styles = [shear, css`
        xf-switch {
            color:var(--xf-text-color)
          }
        :host {
            --scale: 1;
        }

        .switch {
            outline: none;
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            position: relative;
            width: 38px;
            height: 18px;
            background: var(--xf-default-color);
            border: 1px solid #8A8A8A;
            border-radius: 10px;
            transition: border-color .3s, background-color .3s;
        }

        .switch::after {
            content: '';
            display: inline-block;
            width: 11px;
            height: 11px;
            border-radius: 50%;
            background: var(--xf-switch-off-color);
            top: calc(50% - 5.5px);
            position: absolute;
            left: 3px;
            transform-origin: center;
            transform: scale(var(--scale));
            transition: .1s;
        }

        .switch:hover {
            --scale: 1.2;
        }

        .switch:checked {
            background: var(--xf-primary-color);
        }

        .switch:checked::after {
            left: calc(100% - 14px);
            background-color: var(--xf-switch-on-color);
        }
        .switch:active::after{
            width: 13px;
        }
    `];

    constructor() {
        super();
        this.checked = false; // 默认值
    }

    /**
     * 监听复选框的状态变化事件并同步到属性
     */
    handleChange(event) {
        this.checked = event.target.checked; // 同步到组件属性
        this.dispatchEvent(new CustomEvent('change', {
            detail: { checked: this.checked }, // 触发自定义事件，暴露状态
            bubbles: true,
            composed: true
        }));
    }

    render() {
        return html`
            <input
                type="checkbox"
                class="switch"
                .checked="${this.checked}" 
                @change="${this.handleChange}">
        `;
    }
}

customElements.define('xf-switch', XFSwitch);
export { XFSwitch };
