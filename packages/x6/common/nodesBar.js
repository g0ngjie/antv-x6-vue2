// 初始化 节点栏 元素列表
import { Color } from "@antv/x6";
import { ActionType } from "./enums";
import { getActionTypeTheme } from "./transform";

// 基础样式
const BaseStyle = {
    rect: {
        width: '100px',
        height: '50px',
        lineHeight: '36px',
        textAlign: 'center',
        border: '1px solid #5b8ffa',
        backgroundColor: '#9ec9ff',
        borderRadius: '4px',
        color: '#7D7671'
    },
    ellipse: {
        width: '100px',
        height: '50px',
        lineHeight: '50px',
        textAlign: 'center',
        border: '1px solid #5b8ffa',
        backgroundColor: '#9ec9ff',
        borderRadius: '50px / 25px',
        color: '#7D7671'
    },
    // diamond 菱形
    diamond: {
        width: '50px',
        height: '50px',
        lineHeight: '36px',
        textAlign: 'center',
        border: '1px solid #5b8ffa',
        backgroundColor: '#9ec9ff',
        borderRadius: '4px',
        color: '#7D7671',
        transform: 'rotateZ(45deg)'
        // transform: 'rotate(45deg)',
        // transform: 'rotate(-45deg)'
    }
}

function getStyles(type) {
    const { TRIGGER, CONDITION, ACTION } = ActionType
    let base;
    const targetTheme = getActionTypeTheme(type)
    switch (type) {
        case TRIGGER:
            base = BaseStyle.ellipse
            break;
        case CONDITION:
            base = BaseStyle.diamond
            break;
        case ACTION:
            base = BaseStyle.rect
            break;
        default:
            break;
    }
    return {
        ...base,
        backgroundColor: Color.lighten(targetTheme, 40),
        borderColor: targetTheme
    }
}

export const nodes = [
    {
        label: '触发器',
        actionType: ActionType.TRIGGER,
        styles: getStyles(ActionType.TRIGGER),
        shape: 'ellipse'
    },
    {
        label: '条件',
        actionType: ActionType.CONDITION,
        styles: getStyles(ActionType.CONDITION),
        shape: 'diamond'
    },
    {
        label: '动作',
        actionType: ActionType.ACTION,
        styles: getStyles(ActionType.ACTION),
        shape: 'rect'
    },
]