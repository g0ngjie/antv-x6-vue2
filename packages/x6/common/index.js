import { Lang } from "@antv/x6";
import { ActionType, CustomEventTypeEnum, StoreKey } from "./enums";
import { fromJSON, toJSON } from "./transform";
import { Channel } from "./transmit";
import { freezeGraph, unfreezeGraph } from "./trigger";

/**json格式化 */
export function fmtJSON(target) {
    try {
        if (Lang.isString(target)) return JSON.parse(target)
        if (Lang.isArray(target)) return target.map((item) => {
            if (Lang.isObject(item)) return item
            return JSON.parse(item)
        })
        else if (Lang.isObject(target)) return target
        else throw new TypeError('nodes or edges error')
    } catch (error) {
        return {}
    }
}

/**文字溢出格式化 */
export function fmtLabelOverflow(label) {
    if (!Lang.isString(label)) return label
    if (label.length <= 9) return label
    const cutLabel = label.slice(0, 6) + '...'
    return cutLabel
}

function getStore(key) {
    return window[key]
}

/**缓存 */
function linkedPointByStore(key, target) {
    window[key] = target
}

/**画布节点链接 */
export function linkedGraph(graph) {
    linkedPointByStore(StoreKey.GRAPH, graph)
}

/**获取画布数据 */
export function getGraphJSON() {
    const graph = getStore(StoreKey.GRAPH)
    return toJSON(graph)
}

/**初始化画布默认数据 */
export function setDefaultGraphData(nodes, edges) {
    const graph = getStore(StoreKey.GRAPH)
    fromJSON(graph, nodes, edges)
}

/**冻结画布 */
export function disableGraph(bool) {
    const graph = getStore(StoreKey.GRAPH)
    if (bool) freezeGraph(graph)
    else unfreezeGraph(graph)
}

/**监听单元事件双击回调 */
export function nodeDclick(cb) {
    Channel.eventListener(CustomEventTypeEnum.DOUBLE_NODE_CLICK, (detail) => {
        cb(detail)
    });
}

/**监听单元事件单击回调 */
export function nodeClick(cb) {
    Channel.eventListener(CustomEventTypeEnum.NODE_CLICK, (detail) => {
        cb(detail)
    });
}

/**修改Node节点文案 */
export function updateNodeLabel(label) {
    const graph = getStore(StoreKey.GRAPH)
    const cells = graph.getSelectedCells()
    if (Lang.isArray(cells) && cells.length === 1) {
        const cell = cells[0]
        const cutLabel = fmtLabelOverflow(label)
        cell.setData({
            tooltip: label,
            initialization: false
        })
        cell.setAttrs({ label: { text: cutLabel } })
    }
}

/**
 * 图形校验
 * 判断是否有未连接的节点
 */
export function validate() {
    const graph = getStore(StoreKey.GRAPH)

    const errs = []

    const cells = graph.getCells()
    if (!cells.length) errs.push('画布无可用节点')

    const edges = graph.getEdges()
    const nodeSet = new Set(
        edges.reduce((a, v) => {
            a.push(v.target.cell)
            a.push(v.source.cell)
            return a
        }, [])
    )

    const nodes = graph.getNodes()

    if (nodeSet.size !== nodes.length) errs.push('存在未连线的节点')

    // 校验 是否包含 触发器 和 动作
    const { TRIGGER, ACTION } = ActionType
    let startNodes = 0, endNodes = 0
    for (const node of nodes) {
        const { initialization, tooltip, actionType } = node.getData()
        // 数据未修改过
        if (initialization) errs.push(`[${tooltip || ''}]节点数据不能为空`)
        switch (actionType) {
            case TRIGGER:
                startNodes += 1
                break;
            case ACTION:
                endNodes += 1
                break;
        }
    }

    if (!startNodes || !endNodes) errs.push('流程链路未闭环')

    return { ok: !errs.length, errs }
}