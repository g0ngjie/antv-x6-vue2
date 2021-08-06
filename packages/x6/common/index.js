
export function typeIs(target) {
    const Type = {
        '[object String]': 'string',
        '[object Number]': 'number',
        '[object Boolean]': 'boolean',
        '[object Symbol]': 'symbol',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Function]': 'function',
        '[object Date]': 'date',
        '[object Array]': 'array',
        '[object Object]': 'object',
        '[object Map]': 'map',
        '[object RegExp]': 'regexp',
        '[object Error]': 'error',
        '[object HTMLDocument]': 'document',
        '[object global]': 'window'
    }
    const find_proto = Object.prototype.toString.call(target)
    const type_to_string = Type[find_proto]
    return type_to_string
}

/**json格式化 */
function fmtJSON(target) {
    if (typeIs(target) === 'string') return JSON.parse(target)
    if (typeIs(target) === 'array') return target.map((item) => JSON.parse(item))
    else if (typeIs(target) === 'object') return target
    else throw new TypeError('nodes or edges error')
}

/**
 * G6数据转义X6
 * @param {String|Object} nodes 
 * @param {String|Object} edges 
 */
export function transformX6Data(nodes, edges) {
    const nodesJSON = fmtJSON(nodes)
    const edgesJSON = fmtJSON(edges)
}