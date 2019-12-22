// Singleton pattern

const SINGLETON_INSTANCE = Symbol('instance');
const PRIVATE_CONSTRUCTOR = Symbol('constructor');

class Singleton {
    constructor(enforcer) {
        if (enforcer !== PRIVATE_CONSTRUCTOR) {
            throw new Error('use Singleton.getInstance() instead of new');
        }
        this.todo = [];
        this.user = {};
    }
    static get instance() {
        if (!this[SINGLETON_INSTANCE]) {
            this[SINGLETON_INSTANCE] = new Singleton(PRIVATE_CONSTRUCTOR);
        }
        return this[SINGLETON_INSTANCE];
    }
    static set instance(v) {
        throw new Error("Can't change instance");
    }
}

export default Singleton;