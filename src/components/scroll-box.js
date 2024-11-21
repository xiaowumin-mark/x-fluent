import { html, css, LitElement } from 'lit';
import { shear } from "../style/index"
class XFScrollBox extends LitElement {
    static properties = {
        width: {
            type: String
        },
        height: {
            type: String
        },
        direction: {
            type: String
        }
    };

    static styles = [shear, css`
        xf-scroll-box{
            display:block;
        }
        :host{
            --xf-scroll-width:2px;

        }

            /*定义滚动条高宽及背景
        高宽分别对应横竖滚动条的尺寸*/
        ::-webkit-scrollbar
        {
            width:var(--xf-scroll-width);
            background-color:#ffffff00;
        }

        

        /*定义滚动条轨道
        内阴影+圆角*/
        ::-webkit-scrollbar-track
        {
            border-radius:10px;
            background-color:#ffffff00;
        }
        /*定义滑块
        内阴影+圆角*/
        ::-webkit-scrollbar-thumb
        {
            border-radius:10px;
            background-color:#898A8B;
        }


  `]
    constructor() {
        super();
        this.width = "100%";
        this.height = "100%";
        this.direction = "y";
        this._timer = null;
    }
    _mouseover(event) {
        const target = this.shadowRoot.querySelector('div');
        const isOverScrollbar =
            event.offsetX > event.target.clientWidth &&
            event.offsetX <= event.target.offsetWidth;
        if (isOverScrollbar) {
            console.log('鼠标悬停在滚动条上');
            //event.target.style.setProperty('--xf-scroll-width', '5px')
            let scrollWidth = 2;
            this._timer = setInterval(() => {
                if (scrollWidth < 7) {
                    scrollWidth++;
                } else {
                    clearInterval(this._timer);
                }
                console.log(target);// null
                

                target.style.setProperty('--xf-scroll-width', scrollWidth + 'px')
            }, 10);
        }
    }
    _mouseout(event) {
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = null;
            event.target.style.setProperty('--xf-scroll-width', '2px')
            
        } else {
            event.target.style.setProperty('--xf-scroll-width', '2px')
        }
    }
    render() {
        return html`
        <div class="f" style="width:${this.width};height:${this.height};${this.direction == 'y' ? 'overflow-y:auto;overflow-x:hidden;' : 'overflow-y:hidden;overflow-x:auto;'}" @mouseover="${this._mouseover}" @mouseout="${this._mouseout}">

            <slot></slot>
        </div>
    `;
    }
}

customElements.define('xf-scroll-box', XFScrollBox);
export { XFScrollBox };
