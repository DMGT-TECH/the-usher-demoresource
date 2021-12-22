# The Usher: Demo Backend Resource Server

This is a backend resource that does simple arithmetic for a client that is authorized by The Usher.

A test instance of this resource server is deployed at https://my-theusher-resourceserver.glitch.me

The API for this backend resource is described in, and instantiated at runtime based on, [this OpenAPI specification document](math-service-openapi-spec.yaml).

## Limitations

Note that this resource server will accept any valid, signed access token -- from any instance of The Usher -- with the right permissions. A fully secured resource server would need additional code to implement an issuer whitelist, which would lock down access only from particular The Usher instance(s).

## Configuration

None.

## Usage

Your client application should do the following steps:

1. Authenticate (obtain an IdP token from Auth0) for a user like `test-user1@dmgtoocto.com`
1. Get authorization (obtain a token) from The Usher by calling `/self/token`
1. Access one of the API endpoints like `/add/` passing the The Usher token in the header as `Authorization: Bearer <token>`, and values for the left and right operands.

The Glitch client application at https://my-theusher-client.glitch.me/ is a convenient front-end client that does all of the above.
