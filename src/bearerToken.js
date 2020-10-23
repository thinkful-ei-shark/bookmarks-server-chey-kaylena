const {API_TOKEN} = require('./config')
const logger = require('./logger')

function validateToken(req, res, next){
    const apiKey = API_TOKEN;
    const authToken = req.get('Authorized')

    if(!authToken || authToken.split(' ')[1] !== apiKey){
        logger.error(`Request Unauthorized to path ${req.path}`);
        return res.status(401).json({ error: 'Unauthorized'})
    }
    next()
}

module.exports = validateToken;