// G6转X6
import { Color, Lang } from "@antv/x6"
import { fmtJSON, fmtLabelOverflow } from ".";
import { ActionType, NodeThemeEnum as Theme } from "./enums";

/**获取不同actionType对应主题色 */
export function getActionTypeTheme(type) {
    // 默认主题色
    const DEFAULE_THEME = Theme.DEFAULT
    if (!type) return DEFAULE_THEME
    const { CONTINUOUSTRIGGER, TRIGGER, CONDITION, ACTION, SOCIAL, SOCIAL_ACTIVE } = ActionType
    return {
        // 持续状态触发器
        [CONTINUOUSTRIGGER]: Theme.BLUE,
        // 触发器
        [TRIGGER]: Theme.GREEN,
        // 状态条件
        [CONDITION]: Theme.ORANGE,
        // 执行动作
        [ACTION]: Theme.GRAY,
        // 社会化组件
        [SOCIAL]: Theme.YELLOW,
        // 社会化动效组件
        [SOCIAL_ACTIVE]: Theme.DEFAULT,
    }[type]
}

/**
 * 获取默认配置选项
 * 兼容x6/g6
 */
function getBaseConfig(node) {
    let { type, shape, tooltip, attrs, x, y, size, id, position, actionType, initialization } = node
    let _width,
        _height,
        _x = x,
        _y = y,
        _shape = shape,
        _tooltip = tooltip
    if (size) {
        // G6
        if (Lang.isArray(size)) {
            _width = size[0]
            _height = size[1]
        }
        // x6
        else if (Lang.isObject(size)) {
            _width = size.width
            _height = size.height
        }
    }
    if (Lang.isObject(position)) {
        _x = position.x
        _y = position.y
    }
    // 形状转义
    // G6
    if (Lang.isString(type)) {
        _shape = type
        if (type === 'diamond') _shape = 'rect'
    }
    if (Lang.isObject(attrs)) {
        _tooltip = attrs.label.text
    }

    const cutLabel = fmtLabelOverflow(_tooltip)

    return {
        type: _shape,
        label: cutLabel,
        x: _x,
        y: _y,
        width: _width,
        height: _height,
        id,
        actionType,
        data: {
            actionType,
            initialization,
            tooltip: _tooltip
        }
    }
}

/**
 * 获取多边形node节点
 */
export function getEllipseNode(node) {
    const { type, label, x, y, width, height, id, actionType, data } = getBaseConfig(node)
    // 主题色
    const targetTheme = getActionTypeTheme(actionType)
    return {
        id,
        shape: type, // 指定使用何种图形，默认值为 'rect'
        width,
        height,
        x,
        y,
        zIndex: 100,
        data,
        attrs: {
            label: {
                text: label,
                fill: "#7D7671",
                strokeWidth: 0.4,
                fontSize: 12,
            },
            body: {
                stroke: targetTheme,
                strokeWidth: 1,
                fill: Color.lighten(targetTheme, 40),
            }
        },
        ports: {
            items: [
                { group: 'port_g', id: 'p_bottom' },
            ],
            groups: {
                port_g: {
                    attrs: {
                        circle: {
                            dataClass: 'choice-point',
                            r: 6,
                            magnet: true,
                            stroke: '#5b8ffa',
                            strokeWidth: 1,
                            fill: '#fff'
                        },
                    },
                    position: 'bottom'
                }
            }
        },
    }
}

/**
 * 获取矩形node节点
 */
export function getRectNode(node) {
    const { type, label, x, y, width, height, id, actionType, data } = getBaseConfig(node)
    // 主题色
    const targetTheme = getActionTypeTheme(actionType)
    return {
        id,
        shape: type, // 指定使用何种图形，默认值为 'rect'
        width,
        height,
        x,
        y,
        zIndex: 100,
        markup: [
            {
                tagName: 'rect',
                selector: 'body',
            },
            {
                tagName: 'text',
                selector: 'label',
            }
        ],
        data,
        attrs: {
            label: {
                text: label,
                fill: "#7D7671",
                strokeWidth: 0.4,
                fontSize: 12,
            },
            body: {
                stroke: targetTheme,
                strokeWidth: 1,
                fill: Color.lighten(targetTheme, 40),
            }
        },
        ports: {
            items: [
                { group: 'port-top', id: 'p_top' },
                { group: 'port-bottom', id: 'p_bottom' },
            ],
            groups: {
                "port-top": {
                    position: 'top',
                    zIndex: 20,
                    attrs: {
                        circle: {
                            dataClass: 'choice-point',
                            r: 6,
                            magnet: true,
                            stroke: '#5b8ffa',
                            strokeWidth: 1,
                            fill: '#fff'
                        }
                    }
                },
                "port-bottom": {
                    position: 'bottom',
                    zIndex: 20,
                    attrs: {
                        circle: {
                            dataClass: 'choice-point',
                            r: 6,
                            magnet: true,
                            stroke: '#5b8ffa',
                            strokeWidth: 1,
                            fill: '#fff'
                        }
                    }
                }
            }
        },
    }
}

/**
 * 获取菱形node节点
 */
export function getDiamondNode(node) {
    const { type, label, x, y, id, actionType, data } = getBaseConfig(node)
    // 主题色
    const targetTheme = getActionTypeTheme(actionType)
    return {
        id,
        shape: type, // 指定使用何种图形，默认值为 'rect'
        width: 50,
        height: 50,
        x,
        y,
        zIndex: 100,
        markup: [
            {
                tagName: 'rect',
                selector: 'body'
            },
            {
                tagName: 'text',
                selector: 'label',
            }
        ],
        data,
        attrs: {
            label: {
                text: label,
                fill: "#7D7671",
                strokeWidth: 0.4,
                fontSize: 12,
            },
            body: {
                transform: "rotate(-45,25,25)",
                stroke: targetTheme,
                strokeWidth: 1,
                fill: Color.lighten(targetTheme, 40),
                rx: 5, // 属性用于定义水平轴向的圆角半径尺寸。
                ry: 5,
            }
        },
        ports: {
            items: [
                { group: 'in', id: 'p_top' },
                { group: 'out', id: 'p_bottom' },
            ],
            groups: {
                in: {
                    attrs: {
                        circle: {
                            dataClass: 'choice-point',
                            r: 6,
                            magnet: true,
                            stroke: '#5b8ffa',
                            strokeWidth: 1,
                            fill: '#fff',
                            // 上平移
                            transform: 'translate(0, -7)'
                        }
                    },
                    position: 'top'
                },
                out: {
                    attrs: {
                        circle: {
                            dataClass: 'choice-point',
                            r: 6,
                            magnet: true,
                            stroke: '#5b8ffa',
                            strokeWidth: 1,
                            fill: '#fff',
                            // 下平移
                            transform: 'translate(0, 7)'
                        }
                    },
                    position: 'bottom'
                }
            }
        },
    }
}

function getNodeJSON(nodes) {
    const nodeList = []
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const nodeJSON = fmtJSON(node)
        // 兼容G6
        const shape = nodeJSON.type || nodeJSON.shape
        switch (shape) {
            case 'ellipse':
                nodeList.push(getEllipseNode(nodeJSON))
                break;
            case 'rect':
                nodeList.push(getRectNode(nodeJSON))
                break;
            case 'diamond':
                nodeList.push(getDiamondNode(nodeJSON))
                break;
            default:
                break;
        }
    }
    return nodeList
}

/**
 * 按照指定的 JSON 数据渲染节点和边。
 */
export function fromJSON(graph, nodes, edges) {
    if (!Lang.isArray(nodes) || !Lang.isArray(edges)) throw new TypeError('节点或者边数据格式不正确')
    graph.fromJSON({
        nodes: getNodeJSON(nodes),
        edges: fmtJSON(edges)
    });
}

/**
 * 序列化
 */
export function toJSON(graph) {
    const edges = [], nodes = []
    const getNodes = graph.getNodes()
    const getEdges = graph.getEdges()
    for (let i = 0; i < getNodes.length; i++) {
        const node = getNodes[i];
        nodes.push(JSON.stringify(node))
    }
    for (let j = 0; j < getEdges.length; j++) {
        const edge = getEdges[j];
        edges.push(JSON.stringify(edge))
    }
    return { nodes, edges }
}