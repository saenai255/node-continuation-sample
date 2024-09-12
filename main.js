const express = require('express');
const { session } = require('./context');
const { router } = require('./routes')
const { CacheService, LoggerService } = require('./services');

function main() {
    const app = express();

    session.set('cacheService', new CacheService());
    
    app.use((req, res, next) => {
        session.runPromise(async () => {
            const requestId = Math.floor(Math.random() * 1000);
            session.set('requestId', requestId);
            session.set('loggerService', new LoggerService(requestId))
            // introduce race conditions
            await new Promise(r => setTimeout(r, Math.floor(Math.random() * 1000) + 500))
            await next()
        });
    });
    
    app.use(router);
    
    app.listen(3300, () => {
        console.log('Started on http://localhost:3300');


        // run multiple requests to test concurrency
        for (let i = 0; i < 15; i++) {
            fetch('http://localhost:3300/greet').then(it => it.json()).then(it => console.log(`Response:`, it))
        }
    })
}

session.run(() => main());