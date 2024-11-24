import { html, css, LitElement } from 'lit';
import { unselectable, shear } from "../style/index";

class XFDropDownButton extends LitElement {
    static properties = {
        disabled: { type: Boolean },
        label: { type: String },
    };

    static styles = [
        unselectable,
        shear,
        css`
        xf-drop-down-button {

            color:var(--xf-text-color)
          }
          svg{
            filter:var(--xf-svg-color)
        }
            .ddb_main {
                padding-right: 0px;
                cursor: default;
                display: inline-flex;
                align-items: center;
                justify-content: space-between;
                background-color: var(--xf-default-color);
            }
            .ddb_main:hover {
                background-color: var(--xf-default-hover-color);
            }
            .ddb_main:active {
                background-color: var(--xf-default-active-color);
                border-color: var(--xf-border-active-color);
                color: var(--xf-text-active-color);
            }
            .disabled {
                border-color: var(--xf-disabled-border-color);
                background-color: var(--xf-disabled-color);
                color: var(--xf-disabled-text-color);
                pointer-events: none;
            }
            .ddb_right_btn {
                display: flex;
                align-items: center;
                margin-left: 4px;
                margin-right: 4px;
            }
            .ddb_ctn {
                width: auto;
                height: auto;
                position: absolute;
                z-index: 9999;
                box-shadow: 0px 10px 23px 3px rgba(100, 100, 111, 0.2);
                height: 0px;
                display: none;
                transition: height 0.2s ;
                overflow: hidden;
                display: none;
                padding-left:5px;
                padding-right:5px;
                background-color: white;

            }
            #ddb_father{
                display: inline-block;
            }
            .mask{
                position: fixed;
                top: 0px;
                left: 0px;
                width: 100%;
                height: 100vh;
                pointer-events: none;
            }
        `
    ];

    constructor() {
        super();
        this.disabled = false;
        this.isOpen = false;
    }


    render() {
        return html`
        <div class="mask" @click="${this._maskOnClick}"></div>
        <div id="ddb_father">
            <div class="shear ddb_main unselectable ${this.disabled ? 'disabled' : ''}" @mousedown="${this._btnOnDown}" @mouseup="${this._btnOnUp}">
                <div><span>${this.label}</span></div>
                <div class="ddb_right_btn">
                    <svg width="12" height="12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M36 18L24 30L12 18" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
            <div class="ddb_ctn shear" @click="${this._ctnonClick}">
                <slot></slot>
            </div>
        </div>
        <!-- 弹窗的遮罩，点击关闭弹窗 -->
        
        `;
    }
    _ctnonClick(e) {
        // 点击子元素，关闭弹窗
        console.log(e.target);
        let ctn = this.shadowRoot.querySelector('.ddb_ctn');
        if (e.target != ctn) {
            setTimeout(() => {
                this._close();
            }, 100);
        }


    }
    _maskOnClick() {
        if (this.isOpen) {
            this._close();
        }
    }
    firstUpdated() {
        const ddbMain = this.shadowRoot.querySelector('.ddb_main');
        const ddbCtn = this.shadowRoot.querySelector('.ddb_ctn');
        if (ddbMain && ddbCtn) {
            const rect = ddbMain.getBoundingClientRect();
            ddbCtn.style.left = `${rect.left}px`;
            ddbCtn.style.top = `${rect.bottom + 5}px`; // 下方弹出
        }
    }

    _btnOnDown(e) {
        e.stopPropagation(); // 防止事件冒泡到 window
        let svg = e.currentTarget.querySelector('svg');
        svg.animate(
            [
                { transform: 'translateY(3px)' }
            ],
            {
                duration: 100,
                fill: 'forwards',
                easing: 'ease-in',
                iterations: 1
            }
        );
    }

    _btnOnUp(e) {
        let svg = e.currentTarget.querySelector('svg');
        svg.animate(
            [
                { transform: 'translateY(3px)' },
                { transform: 'translateY(-2px)' },
                { transform: 'translateY(0px)' }
            ],
            {
                duration: 200,
                fill: 'forwards',
                easing: 'ease-out',
                iterations: 1
            }
        );

        if (!this.isOpen) {
            this._open();
        }
        else {
            this._close();
        }
    }

    _open() {
        let box = this.shadowRoot.querySelector('.ddb_ctn');
        box.style.display = 'initial';
        box.style.height = box.scrollHeight - 8 + 'px';
        this.isOpen = true;
        this.shadowRoot.querySelector('.mask').style.pointerEvents = 'all';
    }

    _close() {
        let box = this.shadowRoot.querySelector('.ddb_ctn');
        box.style.height = '0px';
        setTimeout(() => {
            box.style.display = 'none';
        }, 200);
        this.isOpen = false;
        this.shadowRoot.querySelector('.mask').style.pointerEvents = 'none';
    }
}

customElements.define('xf-drop-down-button', XFDropDownButton);
export { XFDropDownButton };
