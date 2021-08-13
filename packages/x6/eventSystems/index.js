import cellHover from "./cellHover";
import cellRemove from "./cellRemove";
import cellSelect from "./cellSelect";
import connectEdge from "./connectEdge";
import nodeClick from "./nodeClick";

// 统一注册 事件系统
export default function (graph) {
    cellHover(graph)
    cellRemove(graph)
    cellSelect(graph)
    connectEdge(graph)
    nodeClick(graph)
}