import {
    getGraphJSON,
    setDefaultGraphData,
    disableGraph,
    nodeDclick,
    nodeClick,
    updateNodeLabel,
    validate
} from "./x6/common";

interface IExportData {
    /**序列化节点 */
    nodes: string[]
    /**序列化边 */
    edges: string[]
    /**节点JSON */
    nodesJSON: any[]
    /**边JSON */
    edgesJSON: any[]
}

/**
 * 获取数据
 * @returns {IExportData}
 */
export function exportData(): IExportData {
    return getGraphJSON()
}

/**
 * 初始化画布默认数据
 * @param {any[]} nodes 节点
 * @param {any[]} edges 边
 */
export function initDefaultData(nodes: any[], edges: any[]): void {
    setDefaultGraphData(nodes, edges)
}

/**
 * 画布只读
 * @param {boolean} bool 
 */
export function onlyLook(bool: boolean): void {
    disableGraph(bool)
}

/**
 * 修改Node节点文案
 * @param {string} label 文案
 */
export function updateLabel(label: string): void {
    updateNodeLabel(label)
}

interface IGraphValidate {
    /**判断条件 */
    ok: boolean
    /**异常列表 */
    errs: string[]
}

/**
 * 图形校验
 * @returns {IGraphValidate}
 */
export function graphValidate(): IGraphValidate {
    const { ok, errs } = validate()
    return { ok, errs }
}

type IActionType = 'TRIGGER' | 'CONDITION' | 'ACTION'
interface IDetail {
    /**节点ID */
    nodeId: string
    /**内容 */
    label: string
    /**类型 */
    actionType: IActionType
    /**节点源 */
    node: any
}

interface ICallbackFunc {
    (cb: IDetail): void
}

/**
 * 检测画布事件回调
 * @class
 */
export class GraphListener {

    /**
     * 监听单元事件双击回调
     * @param {Function} cb callback
     * @static
     * @example
     * ```
     * GraphListener.doubleNodeClick((detail) => {
     *   const { nodeId, label, actionType, node } = detail
     * })
     * ```
     */
    static doubleNodeClick(cb: ICallbackFunc): void {
        nodeDclick(cb)
    }

    /**
     * 监听单元事件单击回调
     * @param {Function} cb callback
     * @static
     * @example
     * ```
     * GraphListener.nodeClick((detail) => {
     *   const { nodeId, label, actionType, node } = detail
     * })
     */
    static nodeClick(cb: ICallbackFunc): void {
        nodeClick(cb)
    }
}
