/**
 * 获取数据
 */
export declare function exportData(): {
    nodes: string[];
    edges: string[];
    nodesJSON: any[];
    edgesJSON: any[];
};
/**
 * 初始化画布默认数据
 * @param {any[]} nodes 节点
 * @param {any[]} edges 边
 */
export declare function initDefaultData(nodes: any[], edges: any[]): void;
/**
 * 画布只读
 * @param {boolean} bool
 */
export declare function onlyLook(bool: boolean): void;
/**
 * 修改Node节点文案
 * @param {string} label 文案
 */
export declare function updateLabel(label: string): void;
interface IGraphValidate {
    ok: boolean;
    errs: string[];
}
/**
 * 图形校验
 */
export declare function graphValidate(): IGraphValidate;
declare type IActionType = 'TRIGGER' | 'CONDITION' | 'ACTION';
interface IDetail {
    nodeId: string;
    label: string;
    actionType: IActionType;
    node: any;
}
interface ICallbackFunc {
    (cb: IDetail): void;
}
/**检测画布事件回调 */
export declare class GraphListener {
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
    static doubleNodeClick(cb: ICallbackFunc): void;
    /**
     * 监听单元事件单击回调
     * @param {Function} cb callback
     * @example
     * ```
     * GraphListener.nodeClick((detail) => {
     *   const { nodeId, label, actionType, node } = detail
     * })
     */
    static nodeClick(cb: ICallbackFunc): void;
}
export {};
