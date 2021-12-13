const expressJwt = require('express-jwt');
const jwtDecoder = require('jsonwebtoken');
const jwksRsa = require('jwks-rsa');

const { promisify } = require("util");


async function verifyAndDecodeToken(token) {
    if (!token) {
        throw new Error("No IdP JWT provided.");
    }
    let decodedToken = jwtDecoder.decode(token.replace("Bearer ",""), {complete: true});
    if (!decodedToken.payload.sub) {
        throw new Error("Could not find sub in token.");
    }
    let issuerClaim = decodedToken.payload.iss; // Use iss claim to look up appropriate JWKS.
    if (!issuerClaim.endsWith("/")) { issuerClaim += "/"; }
    const jwks_uri = issuerClaim + ".well-known/jwks.json";
    
    console.log("Using " + jwks_uri + " for iss claim " + issuerClaim);
    const client = jwksRsa({ rateLimit: true, jwksRequestsPerMinute: 10, jwksUri: jwks_uri });
    const getSigningKeyF = promisify(client.getSigningKey);
    const keySet = await getSigningKeyF(decodedToken.header.kid);
    const signingKey = keySet.getPublicKey();
    try {
        const decoded = jwtDecoder.verify(token.replace("Bearer ", ""), signingKey)
        if (decoded) {
            return decodedToken.payload;
        } else {
            throw new Error("Unauthorized: Authorization is not valid, no payload.");
        }
    }
    catch (err) {
        throw {
              name:        "VerificationError",
              message:     "Could not verify token: " + err + "\n",
              toString:    function(){return this.name + ": " + this.message;}
        };
    }
}

async function verifyTokenMiddleware(req, secDef, token, next) {
    try {
        const payload = await verifyAndDecodeToken(token);  // If the token isn't verified an exception will be thrown

        if (payload.scope.includes("test-permission1")) {
            return next()
        } else {
            next(req.res.status(401).send("Unauthorized: no scope test-permission1."));
        }
    }
    catch (err) {
      next(req.res.status(401).send("Unauthorized: Authorization is not valid.\n" + err));
    }
}

module.exports = {
    verifyTokenMiddleware
}
