/**
 * @class 通信
 */
export class Channel {

    /**
     * 事件分发
     * @param {CustomEventTypeEnum<string>} TypeEnum 事件分发类型
     * @param {any} detail 详情
     */
    static dispatchEvent(TypeEnum, detail) {
        if (!TypeEnum) throw new Error('TypeEnum not found')
        window.dispatchEvent(new CustomEvent(TypeEnum, {
            detail,
            bubbles: false,
            cancelable: true,
        }));
    }

    /**
     * 事件监听
     * @param {CustomEventTypeEnum<string>} TypeEnum 事件分发类型
     * @param {Function} callback 回调
     */
    static eventListener(TypeEnum, callback) {
        if (!TypeEnum) throw new Error('TypeEnum not found')
        window.addEventListener(
            TypeEnum,
            function (event) {
                callback(event.detail)
            },
            false
        );
    }
}

/**
 * @class 订阅模式
 */
export class EventBus {
    constructor() {
        this._events = [];//存储自定义事件
    }
    /**
     * 注册事件和处理函数
     * @param event
     * @param fn
     */
    on(event, fn) {
        if (Array.isArray(event)) {
            for (let i = 0, l = event.length; i < l; i++) {
                this.on(event[i], fn)
            }
        } else {
            // 存在直接push, 不存在创建为空数组再push
            (this._events[event] || (this._events[event] = [])).push(fn)
        }
    }

    /**
     * 注册事件和处理函数，触发一次后销毁
     * @param event
     * @param fn
     */
    once(event, fn) {
        let _self = this;
        function handler() {
            _self.off(event, handler);
            fn.apply(null, arguments);//emit里面调用时会给on方法传参
        }

        handler.fn = fn;//off里面根据这个判断销毁事件
        this.on(event, handler);
    }

    /**
     * 销毁事件和处理函数
     * @param event
     * @param fn
     */
    off(event, fn) {
        //不传参数表示清空所有
        if (!arguments.length) {
            this._events = [];
        }
        //数组循环清空
        if (Array.isArray(event)) {
            for (let i = 0, l = event.length; i < l; i++) {
                this.off(event[i], fn)
            }
        }
        const cbs = this._events[event];
        if (!cbs) {
            return;
        }
        //不传第二参表示清空某事件所有监听函数
        if (arguments.length == 1) {
            this._events[event] = null
        }
        let cb, i = cbs.length
        while (i--) {
            cb = cbs[i]
            if (cb === fn || cb.fn === fn) { //cb.fn===fn用来移除once注册的事件
                cbs.splice(i, 1)
                break
            }
        }
    }

    /**
     * 触发某事件所有回调并带参数
     * @param event
     */
    emit(event) {
        //once删除事件会导致下面循环过程中this._events内fn前移, 所以此处复制成新数组
        let cbs = [...this._events[event]];
        if (cbs) {
            for (let i = 0, l = cbs.length; i < l; i++) {
                try {
                    cbs[i].apply(null, [...arguments].slice(1))
                } catch (e) {
                    new Error(e, `event handler for "${event}"`)
                }
            }
        }
    }
}
