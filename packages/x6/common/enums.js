
/**
 * 基类Cell形状
 * @enum
 */
export const ShapeEnum = {
    /**@type {String} 矩形 */
    RECT: 'rect',
    /**@type {String} 圆形 */
    CIRCLE: 'circle',
    /**@type {String} 椭圆 */
    ELLIPSE: 'ellipse',
    /**@type {String} 多边形 */
    POLYGON: 'polygon',
}

/**
 * Node类型
 * @enum
 */
export const NodeTypeEnum = {
    /**@type {String} 开始节点 */
    BEGIN: 'begin-node',
    /**@type {String} 条件节点 */
    CONDITION: 'condition-node',
    /**@type {String} 尾部节点 */
    TAIL: 'tail-node',
}

/**
 * 同居类型
 * @enum
 */
export const ToolTypeEnum = {
    /**@type {String} 删除元素 */
    REMOVE_BUTTON: 'custom-remove-button'
}

/**
 * 节点主色调
 * @enum
 */
export const NodeThemeEnum = {
    /**@type {String} 蓝色 */
    BLUE: '#A4C2FF',
    /**@type {String} 绿色 */
    GREEN: '#A8D7CD',
    /**@type {String} 橘色 */
    ORANGE: '#FDBE94',
    /**@type {String} 灰色 */
    GRAY: '#C4C4C4',
    /**@type {String} 黄色 */
    YELLOW: '#CCAC55',
}

/**
 * 事件分发类型
 * @enum
 */
export const CustomEventTypeEnum = {
    /**@type {String} 单元点击触发 */
    CELL_CLICK: '__antv_x6_custom_event_type_cell_click__',
    /**@type {String} 节点点击触发 */
    NODE_CLICK: '__antv_x6_custom_event_type_node_click__',
    /**@type {String} 双击节点触发 */
    DOUBLE_NODE_CLICK: '__antv_x6_custom_event_type_cell_double_click__',
    /**@type {String} 帮助信息 */
    HELP: '__antv_x6_custom_event_type_help__',
    /**@type {String} tooltips 回调 */
    TOOLTIPS_CALLBACK: '__antv_x6_custom_event_type_tooltips_callback__',
    /**@type {String} 冻结画布 */
    FREEZE_GRAPH: '__antv_x6_custom_event_type_freeze_graph__',
}

/**
 * 选择状态
 * @enum
 */
export const SelectStateEnum = {
    /**@type {String} 已选中 */
    SELECTED: 'selected',
    /**@type {String} 未选中 */
    UN_SELECTED: 'unselected'
}

/**
 * 配置项
 * @enum
 */
export const Config = {
    /**@type {String} 可操作Node区 插槽 */
    PANEL_AREA_SLOT: 'panel_area_slot',
    /**@type {String} Tooltips 插槽 */
    TOOLTIPS_SLOT: 'tooltips_slot',
}

/**
 * 节点触发类型
 */
export const ActionType = {
    /**@type {String} 持续状态触发器 */
    CONTINUOUSTRIGGER: 'CONTINUOUSTRIGGER',
    /**@type {String} 触发器 */
    TRIGGER: 'TRIGGER',
    /**@type {String} 状态条件 */
    CONDITION: 'CONDITION',
    /**@type {String} 执行动作 */
    ACTION: 'ACTION',
    /**@type {String} 社会化组件 */
    SOCIAL: 'SOCIAL',
    /**@type {String} 社会化动效组件 */
    SOCIAL_ACTIVE: 'SOCIAL',
}