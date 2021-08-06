
import { Button } from '@antv/x6/es/registry/tool/button'

export default Button.define({
    markup: [
        {
            tagName: 'rect',
            selector: 'button',
            attrs: {
                width: 20,
                height: 20,
                rx: 10,
                ry: 10,
                fill: '#ff4d4f',
                stroke: '#ff4d4f',
                cursor: 'pointer',
            }
        },
        {
            tagName: 'text',
            selector: 'text',
            textContent: '-',
            attrs: {
                fill: '#fff',
                fontSize: 40,
                textAnchor: 'middle',
                pointerEvents: 'none',
                x: 10,
                y: 21,
            },
            style: {
                userSelect: 'none'
            }
        },
    ],
    onClick({ view }) {
        const node = view.cell
        // 删除前移除所有包含工具
        node.removeTools()
        node.remove()
    },
})