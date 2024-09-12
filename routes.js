const { Router } = require('express')
const { session } = require('./context')

const router = Router()

router.get('/greet', (req, res) => {
    res.json(doGreet())
})


// greeter service or something
function doGreet() {
    const requestId = session.get('requestId'); // Getters could be transformed to a decorator
    
    /** @type {import('./services').LoggerService} */
    const loggerService = session.get('loggerService');

    loggerService.log(`I'm greeting this user!`);

    return {
        greeting: `Howdy. This is request id ${requestId}`
    }
}

module.exports = {
    router,
}