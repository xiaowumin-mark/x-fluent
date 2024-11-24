import { html, css, LitElement } from 'lit';
import { shear } from "../style/index";

class XFSlider extends LitElement {
    static properties = {
        value: { type: Number }, // 当前值
        min: { type: Number },   // 最小值
        max: { type: Number },   // 最大值
        step: { type: Number },  // 用户步长
    };

    static styles = [shear, css`
        xf-slider {

            color:var(--xf-text-color)
          }
        .slider {
            width: 100%;
            height: 18px;
            position: relative;
        }
        .bar {
            position: absolute;
            top: calc(50% - 2px);
            width: 100%;
            height: 4px;
            border-radius: 2px;
            background: linear-gradient(to right, var(--xf-primary-color) 0%, #868686 0%);
        }
        .bar-inner {
            position: absolute;
            top: 0;
            left: 0;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background-color: var(--xf-slider-color);
            border: 1px solid var(--xf-slider-border-color);
            display: flex;
            justify-content: center;
            align-items: center;
            transform-origin: center;
            cursor: pointer;
        }
        .bar-inner::before {
            content: '';
            width: 9px;
            height: 9px;
            border-radius: 50%;
            background-color: var(--xf-primary-color);
            transform-origin: center;
            transform: scale(1);
            transition: transform 0.2s ease;
        }
        .bar-inner:hover::before {
            transform: scale(1.4);
        }
        .bar-inner:active::before {
            transform: scale(0.9);
        }
        .topic {
            position: absolute;
            top: -50px;
            width: auto;
            height: 25px;
            line-height: 25px;
            padding: 2px 9px;
            font-size: 12px;
            background-color:  #F8F8F8;
            border: 1px solid #e7e7e7;
            border-radius: 3px;
            box-shadow: 0px 10px 23px 3px rgba(100, 100, 111, 0.2);
            opacity: 0;
            transition: opacity 0.3s ease;
        }
    `];

    constructor() {
        super();
        this.value = 50; // 默认值
        this.min = 0;    // 默认最小值
        this.max = 100;  // 默认最大值
        this.step = 1;   // 用户步长，默认 1
        this._isDragging = false; // 内部状态：是否正在拖动
        this._topicH = '0%'; // 默认不显示
    }

    render() {
        const percentage = ((this.value - this.min) / (this.max - this.min)) * 100;

        return html`
        <div
            class="slider"
            @mousedown=${this._startDrag}
        >
            <div class="bar" style="background: linear-gradient(to right, var(--xf-primary-color) ${percentage}%, #868686 ${percentage}%);"></div>
            <div
                class="bar-inner"
                style="left: calc(${percentage}% - 9px);"
            ></div>
            <div class="topic" style="left: calc(${percentage}% - 14px); opacity:${this._topicH}">
                ${this._getRoundedValue()}
            </div>
        </div>
        `;
    }

    _startDrag(event) {
        event.preventDefault();
        this._isDragging = true;
        this._topicH = '100%';
        this._updatePosition(event);

        // 添加全局事件监听
        window.addEventListener('mousemove', this._onDrag);
        window.addEventListener('mouseup', this._stopDrag);
    }

    _onDrag = (event) => {
        event.preventDefault();
        if (this._isDragging) {
            this._updatePosition(event);
        }
    };

    _stopDrag = (event) => {
        event.preventDefault();
        this._topicH = "0%";
        this._updatePosition(event);
        if (this._isDragging) {
            this._isDragging = false;

            // 触发自定义事件，返回四舍五入后的值
            this.dispatchEvent(new CustomEvent('change', { detail: { value: this._getRoundedValue() } }));

            // 移除全局事件监听
            window.removeEventListener('mousemove', this._onDrag);
            window.removeEventListener('mouseup', this._stopDrag);
        }
    };

    _updatePosition(event) {
        const sliderRect = this.shadowRoot.querySelector('.slider').getBoundingClientRect();
        const offsetX = Math.min(Math.max(event.clientX - sliderRect.left, 0), sliderRect.width);
        const rawValue = (offsetX / sliderRect.width) * (this.max - this.min) + this.min;

        // 精确更新内部值
        this.value = parseFloat(rawValue.toFixed(2));

        // 强制更新组件显示
        this.requestUpdate();
    }

    _getRoundedValue() {
        // 将内部值按用户设定的步长进行四舍五入
        return Math.round(this.value / this.step) * this.step;
    }
}

customElements.define('xf-slider', XFSlider);
export { XFSlider };
