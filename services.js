class Service {
    constructor(name, ...args) {
        console.log(`Service ${name} got instantiated with args:`, args);
    }
}

class CacheService extends Service {
    constructor() {
        super('CacheService');
    }
}
class LoggerService extends Service {
    constructor(requestId) {
        super('LoggerService', { requestId });

        this.requestId = requestId;
    }

    log = (message, ...args) => console.log(`INFO [RequestId: ${this.requestId}]:`, message, args)
}

module.exports = {
    CacheService,
    LoggerService,
}