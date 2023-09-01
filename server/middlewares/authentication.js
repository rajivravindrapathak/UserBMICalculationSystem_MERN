const jwt = require("jsonwebtoken")
require("dotenv").config()

const authentication = (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")[1]
    if(!token) {
        res.status(401).send({ message: 'Token not provided' });
    }
    
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user_id = decoded.user_id
    if(decoded) {
        req.body.user_id = user_id
        next()    
    }  
    else {
        res.status(403).send({ message: 'Invalid token' });
    }
}

module.exports = { authentication }