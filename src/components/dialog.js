import { html, css, LitElement } from 'lit';
import { shear } from "../style/index";

class XFDialod extends LitElement {
  static properties = {
    open: { type: Boolean, reflect: true }, // 反射属性到 DOM
    "close-on-overlay-click": { type: Boolean }, // 属性默认值为 false
    title: { type: String, attribute: "title" }, // 属性名称为 title
  };

  static styles = [
    shear,
    css`
    xf-dialog {

      color:var(--xf-text-color)
    }
      :host {
        display: block;
      }

      /* 背景遮罩 */
      .bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.4);
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s ease;
        padding:0;
        z-index:5;      }
      :host([open]) .bg {
        opacity: 1;
        pointer-events: auto;
      }

      /* 对话框主体 */
      .dialog {
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        padding: 0;
        margin: 0;
        min-width: 300px;
        max-width: 400px;
        width: auto;
        opacity: 0;
        transform: scale(1.1);
        transition: transform 0.2s ease, opacity 0.2s ease;
        z-index: 6;
        background-color:transparent;
      }
      :host([open]) .dialog {
        opacity: 1;
        transform: scale(1);
      }

      /* 标题 */
      .dialog-header {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 8px;
      }

      /* 内容插槽 */
      .dialog-content {
        margin-bottom: 16px;
      }

      /* 按钮 */
      .dialog-footer {
        width: 100%;
        background-color: var(--xf-dialog-footer-color);
        padding: 18px 25px;
        box-sizing: border-box;
        border-radius: 0 0 8px 8px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
      .ctt {
        width: 100%;
        padding: 25px;
        padding-bottom: 10px;
        box-sizing: border-box;
        background-color: var(--xf-dialog-content-color);
        border-radius: 8px 8px 0 0;
        color:var(--xf-text-color);
      }
    `,
  ];

  constructor() {
    super();
    this.open = false;
    this.disabled = false;
    this["close-on-overlay-click"] = false;
    this.title = "";
    this._previousOpenState = false; // 用于记录上一次的 open 状态
  }

  updated(changedProperties) {
    // 检测 open 属性的变化
    if (changedProperties.has('open')) {
      const wasOpen = this._previousOpenState;
      const isOpen = this.open;

      // 如果 open 从 true 变为 false，则触发 close 事件
      if (wasOpen && !isOpen) {
        this.dispatchEvent(new CustomEvent('close', { detail: { open: this.open } }));
      }

      // 更新 previousOpenState
      this._previousOpenState = isOpen;
    }
  }

  closeDialog() {
    if (!this["close-on-overlay-click"]) {
      return;
    }
    this.close();
  }

  close() {
    this.open = false; // 修改 open 属性
  }

  render() {
    return html`
      <div class="bg" @click=${this.closeDialog}>
        <div class="dialog" @click=${(e) => e.stopPropagation()}>
          <div class="ctt">
            <div class="dialog-header" style="display: ${this.title ? 'block' : 'none'}">${this.title}</div>
            <div class="dialog-content">
              <slot name="content"></slot>
            </div>
          </div>
          <div class="dialog-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('xf-dialog', XFDialod);
export { XFDialod };
