import { getGraphJSON, setDefaultGraphData, disableGraph, nodeDclick, nodeClick, updateNode as commonUpdateNode, validate, getAtoms as getAtomList, runtimeError as catchErr, graphClean } from "./x6/common";
/**
 * 获取数据
 * @returns {IExportData}
 */
export const exportData = () => getGraphJSON();
/**
 * 初始化画布默认数据
 * @param {any[]} nodes 节点
 * @param {any[]} edges 边
 */
export const initDefaultData = (nodes, edges) => setDefaultGraphData(nodes, edges);
/**获取所有已存在的node节点和edge边 */
export const getAtoms = (options) => getAtomList(options);
/**
 * 画布只读
 * @param {boolean} bool
 */
export const onlyLook = (bool) => disableGraph(bool);
/**画布清空 */
export const clean = () => graphClean();
/**
 * 修改Node节点
 * @param {IUpdateOptions} options
 */
export const updateNode = (options) => commonUpdateNode(options);
/**
 * 图形校验
 * @returns {IGraphValidate}
 */
export const graphValidate = () => validate();
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
    static doubleNodeClick(cb) {
        nodeDclick(cb);
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
     * ```
     */
    static nodeClick(cb) {
        nodeClick(cb);
    }
    /**
     * 运行时异常监听
     * @param {Function} cb callback
     * @static
     * @example
     * ```
     * GraphListener.runtimeError((err) => {
     *   const { errorCode, errorMsg } = err;
     * })
     * ```
     */
    static runtimeError(cb) {
        catchErr(cb);
    }
}
