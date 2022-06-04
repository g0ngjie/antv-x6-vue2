

export const Tools = {
    undo: {
        svg: "undo",
        can: false,
        title: "撤销",
    },
    redo: {
        svg: "redo",
        can: false,
        title: "重做",
    },
    zoomin: {
        svg: "zoomin",
        title: "放大",
    },
    zoomout: {
        svg: "zoomout",
        title: "缩小",
    },
    copy: {
        svg: "copy",
        title: "复制",
    },
    delete: {
        svg: "dustbin",
        title: "删除",
        can: false,
    },
    focus: {
        svg: "focus",
        title: "居中",
    },
    selectAll: {
        svg: "select_all",
        title: "全选",
    }
}

// 引导文案
export const TipsContent = [
    {
        label: "Ctrl+a",
        value: "单元全选",
    },
    {
        label: "Ctrl+c",
        value: "单元复制",
    },
    {
        label: "Ctrl+v",
        value: "单元粘贴",
    },
    {
        label: "Delete / BackSpace",
        value: "单元删除",
    },
    {
        label: "Ctrl+z",
        value: "单元撤销",
    },
    {
        label: "Ctrl+y",
        value: "单元重做",
    },
    {
        label: "Esc",
        value: "取消所有选中单元",
    },
    {
        label: "Alt+h",
        value: "帮助信息",
    },
    {
        label: "Alt+f",
        value: "画布居中",
    },
    {
        label: "Ctrl+mouseWheel",
        value: "放大/缩小",
    },
    {
        label: "Ctrl+leftMouseDown",
        value: "框选",
    },
]