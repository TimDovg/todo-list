// observer pattern

class Observer {
    constructor() {
        this.subscribers = {}
    }

    subscribe(action, fun) {
        if (!this.subscribers[action]) this.subscribers[action] = [];

        this.subscribers[action].push(fun);
    }

    next(action) {
        this.subscribers[action].forEach(fun => fun());
    }
}

export default new Observer; // singleton pattern alternative