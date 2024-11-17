import { html, css, LitElement } from 'lit';
import { unselectable, shear } from "../style/index";

class XFComboBox extends LitElement {

    static properties = {
        disabled: { type: Boolean },
        label: { type: String },
        value: {
            type: String,
            attribute: 'value',
            reflect: true
        }
    };

    static styles = [
        unselectable,
        shear,
        css`
            .ddb_main {
                padding-right: 0px;
                cursor: default;
                display: inline-flex;
                align-items: center;
                justify-content: space-between;
                background-color: rgb(253, 253, 254);
                min-width:150px;
            }
            .ddb_main:hover {
                background-color: rgb(249, 249, 251);
            }
            .ddb_main:active {
                background-color: rgb(248, 249, 251);
                border-color: rgb(233, 234, 237);
                color: rgb(170, 171, 172);
            }
            .disabled {
                border-color: rgb(229, 229, 229);
                background-color: rgb(245, 245, 245);
                color: rgb(182, 182, 182);
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
                transition: height 0.2s;
                overflow: hidden;
                display: none;
                padding-left:5px;
                padding-right:5px;
                min-width:150px;
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
        this.label = '请选择';
        this.value = '';

    }


    render() {
        return html`
        <div class="mask" @click="${this._maskOnClick}"></div>
        <div id="ddb_father">
            <div class="shear ddb_main unselectable ${this.disabled ? 'disabled' : ''}" @mousedown="${this._btnOnDown}" @mouseup="${this._btnOnUp}">
                <div><span>${this.value ? this.value : this.label}</span></div>
                <div class="ddb_right_btn">
                    <svg width="12" height="12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M36 18L24 30L12 18" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
            <div class="ddb_ctn shear" @click="${this._ctnonClick}" id="ddb_ctn">
                <slot></slot>
            </div>
        </div>
        <!-- 弹窗的遮罩，点击关闭弹窗 -->
        
        `;
    }

    // 监听value变化，更新子元素的tip属性
    updated(changedProperties) {
        console.log(changedProperties);
        
        if (changedProperties.has('value')) {
            const item = this.shadowRoot.querySelector('slot').assignedElements();
            for (let i = 0; i < item.length; i++) {
                item[i].removeAttribute('tip');
                if (item[i].value == this.value) {
                    item[i].setAttribute('tip', 'true');

                    
                }

            }

        }
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

        if (ctn.children[0].tagName == 'XF-MENU-ITEM') {
            console.log('ok');


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
        const item = this.shadowRoot.querySelector('slot').assignedElements();
        for (let i = 0; i < item.length; i++) {
            if (item[i].value == this.value) {
                item[i].setAttribute('tip', 'true');
            }
            item[i].addEventListener('mousedown', () => {
                item[i].setAttribute('tip', 'true');
                for (let j = 0; j < item.length; j++) {
                    if (item[j].getAttribute('tip') == 'true' && j != i) {
                        item[j].removeAttribute('tip');
                    }
                }
            });
            item[i].addEventListener('mouseup', (e) => {
                this.value = item[i].value

            });
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

    _getPostion(data) {
        const ddbMain = this.shadowRoot.querySelector('.ddb_main').getBoundingClientRect();

        const items = this.shadowRoot.querySelector('slot').assignedElements();
        let y = 0
        for (let i = 0; i < items.length; i++) {
            y += items[i].offsetHeight;
            if (items[i].value == data) {
                console.log(y);



                return {
                    x: ddbMain.x,
                    y: ddbMain.y - y - (i * 5 * 0.6)
                };
            }
        }
        return null; // 如果没有找到匹配的元素
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
        const zb = this._getPostion(this.value);
        if (zb) {
            this.shadowRoot.querySelector('.ddb_ctn').style.left = zb.x + 'px';
            this.shadowRoot.querySelector('.ddb_ctn').style.top = (zb.y + 20) + 'px'; // 下方弹出
            console.log(this._getPostion(this.value));
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

customElements.define('xf-combo-box', XFComboBox);
export { XFComboBox };
