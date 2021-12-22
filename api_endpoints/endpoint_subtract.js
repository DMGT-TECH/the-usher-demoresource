const jwtDecoder = require('jsonwebtoken')

function subtract(req, res) {
    let decodedToken = jwtDecoder.decode(req.header('Authorization').replace('Bearer ', ''), { complete: true })
    if (!decodedToken.payload.scope.includes("test-permission2")) {
        res.status(403).send("Unauthorized, need test-permission2")
        return
    }
    const lhs = req.body["left"]
    const rhs = req.body["right"]
    const result = {'result': (parseFloat(lhs) - parseFloat(rhs))}
    res.status(200).send(result)
}


module.exports = {
    subtract
}
