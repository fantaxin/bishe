import { resolveTransitionHooks } from "vue";


class MyEventTarget {
    constructor(name) {
        /**@type {Map<String, Array<Function>>} */
        this.__event_map = null;
        this.name = name;
    }
    /**
    * @description: 
    * @param {string} type
    * @param {Function} listener
    * @return {boolean}
     */
    addEventListener(type, listener) {
        if (this.__event_map === null) {
            this.__event_map = new Map();
        }
        const listeners = this.__event_map;

        if (!listeners.has(type)) {
            listeners.set(type, []);
        }

        if (listeners.get(type).indexOf(listener) === -1) {
            listeners.get(type).push(listener.bind(this));
            return true;
        }

        return false;
    }
    removeEventListener(type, listener) {
        const listeners = this.__event_map;

        if (listeners === null) {
            return false;
        }

        const listenerArray = listeners[type];

        if (listenerArray !== undefined) {
            const index = listenerArray.indexOf(listener);

            if (index !== -1) {
                listenerArray.splice(index, 1);
                return true;
            }
        }

        return false;
    }
    dispatchEvent(event) {
        const listeners = this.__event_map;

        if (listeners === null) {
            return;
        }

        if (listeners.has(event.type)) {
            const array = listeners.get(event.type);

            for (let i = 0; i < array.length; i++) {
                array[i](event);
            }
        }
    }
}

export { MyEventTarget };
