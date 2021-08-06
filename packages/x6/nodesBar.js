// 初始化 节点栏 元素列表
import { NodeTypeEnum } from "./common/enums";

// 基础样式
export const baseStyle = {
    rect: {
        width: '100px',
        height: '50px',
        lineHeight: '36px',
        textAlign: 'center',
        border: '1px solid #5b8ffa',
        backgroundColor: '#9ec9ff',
        borderRadius: '4px',
        color: '#fff'
    },
    ellipse: {
        width: '100px',
        height: '50px',
        lineHeight: '50px',
        textAlign: 'center',
        border: '1px solid #5b8ffa',
        backgroundColor: '#9ec9ff',
        borderRadius: '50px / 25px',
        color: '#fff'
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
        color: '#fff',
        transform: 'rotateZ(45deg)'
        // transform: 'rotate(45deg)',
        // transform: 'rotate(-45deg)'
    }
}
export const nodes = [
    {
        label: '持续状态触发器',
        nodeType: NodeTypeEnum.BEGIN,
        styles: baseStyle.ellipse,
        type: 'ellipse'
    },
    {
        label: '触发器',
        nodeType: NodeTypeEnum.BEGIN,
        styles: baseStyle.ellipse,
        type: 'ellipse'
    },
    {
        label: '状态条件',
        nodeType: NodeTypeEnum.CONDITION,
        styles: baseStyle.diamond,
        type: 'diamond'
    },
    {
        label: '执行动作',
        nodeType: NodeTypeEnum.TAIL,
        styles: baseStyle.rect,
        type: 'rect'
    },
    {
        label: '社会化组件',
        nodeType: NodeTypeEnum.TAIL,
        styles: baseStyle.rect,
        type: 'rect'
    },
    {
        label: '社会化动效组件',
        nodeType: NodeTypeEnum.TAIL,
        styles: baseStyle.rect,
        type: 'rect'
    }
]