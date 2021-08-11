import { getGraphJSON, setDefaultGraphData, disableGraph, nodeDclick, nodeClick, updateNodeLabel } from "./x6/common";
/**
 * 获取数据
 */
export function exportData() {
    return getGraphJSON();
}
/**
 * 初始化画布默认数据
 * @param {any[]} nodes 节点
 * @param {any[]} edges 边
 */
export function initDefaultData(nodes, edges) {
    setDefaultGraphData(nodes, edges);
}
/**
 * 画布只读
 * @param {boolean} bool
 */
export function onlyLook(bool) {
    disableGraph(bool);
}
/**
 * 修改Node节点文案
 * @param {string} label 文案
 */
export function updateLabel(label) {
    updateNodeLabel(label);
}
/**检测画布事件回调 */
export class GraphListener {
    /**
     * 监听单元事件双击回调
     * @param {Function} cb callback
     * @example
     * ```
     * GraphListener.doubleNodeClick((detail) => {
     *   const { nodeId, label, actionType, node } = detail
     * })
     * ```
     */
    static doubleNodeClick(cb) {
        nodeDclick(cb);
    }
    /**
     * 监听单元事件单击回调
     * @param {Function} cb callback
     * @example
     * ```
     * GraphListener.nodeClick((detail) => {
     *   const { nodeId, label, actionType, node } = detail
     * })
     */
    static nodeClick(cb) {
        nodeClick(cb);
    }
}
