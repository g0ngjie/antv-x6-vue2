import { reactive, computed } from "@vue/composition-api";

const state = reactive({
    graph: null,
})

export function useProvideGraph(graph) {
    state.graph = graph
}

export function useGraph() {
    return computed(() => state.graph)
}