import { html, css, LitElement } from 'lit';
import { shear } from "../style/index";

class XFMenu extends LitElement {
    static properties = {
    };

    static styles = [shear, css`
        xf-menu {

            color:var(--xf-text-color)
          }
        dialog {
            border: none;
            width: 100px;
            height: 100px;
            background-color: red;
            border-radius: 5px;
            margin: 0;
            animation: slideDown 0.2s ease-out;
            position: fixed
        }
        @keyframes slideDown {
            from {
                transform: translateY(-100px);
            }
            to {
                transform: translateY(0);
            }
        }
    `];

    constructor() {
        super();
        this.open = false;
        this.x = 0;
        this.y = 0;
        this._handleOutsideClick = this._handleOutsideClick.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('click', this._handleOutsideClick);
    }

    disconnectedCallback() {
        window.removeEventListener('click', this._handleOutsideClick);
        super.disconnectedCallback();
    }

    _handleOutsideClick(e) {
        const dialog = this.shadowRoot.querySelector('dialog');
        if (this.open && dialog && !dialog.contains(e.target)) {
            this.open = false;
        }
    }

    render() {
        return html`
            <dialog 
                ?open="${this.open}" 
                style="left: ${this.x}px; top: ${this.y}px;"
            >
            </dialog>
        `;
    }
}

customElements.define('xf-menu', XFMenu);
export { XFMenu };
