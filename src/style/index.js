import { css } from 'lit';
export const unselectable = css`
.unselectable {
    -webkit-user-select: none;
    /* Chrome/Safari */
    -moz-user-select: none;
    /* Firefox */
    -ms-user-select: none;
    /* IE/Edge */
    user-select: none;
    /* 标准语法 */
}`

export const shear = css`
.shear {
    border:none;
	border-style:solid;
    border-width:0.5px;
    border-radius:4px;
    font-size:12px;
    padding:5px 10px;
    font-family:"Segoe", "微软雅黑", sans-serif;
    transition:all .2s;
    
    border-color: rgb(233, 234, 237);
    border-bottom-color: rgb(208, 209, 211);
}

`