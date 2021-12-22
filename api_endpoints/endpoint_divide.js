const jwtDecoder = require('jsonwebtoken')

function divide(req, res) {
    let decodedToken = jwtDecoder.decode(req.header('Authorization').replace('Bearer ', ''), { complete: true })
    if (!decodedToken.payload.scope.includes("test-permission9")) {
        res.status(403).send("Unauthorized, need test-permission9")
        return
    }
    const lhs = req.body["left"]
    const rhs = req.body["right"]
    const result = {'result': (parseFloat(lhs) / parseFloat(rhs))}
    res.status(200).send(result)
}


module.exports = {
    divide
}
