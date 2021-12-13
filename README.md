# The Usher: Demo Backend Resource Server

This is a backend resource that does simple arithmetic for a client that is authorized by The Usher.

A test instance of this resource server is deployed at https://my-theusher-resourceserver.glitch.me

The API for this backend resource is described in, and instantiated at runtime based on, [this OpenAPI specification document](math-service-openapi-spec.yaml).

## Configuration

None (unless you want to tweak security, like lock down for access only from a particular TheUsher issuer instance).

## Usage

Your client application should do the following steps:

1. Authenticate (obtain an IdP token from Auth0) for a user like test-user1@dmgtoocto.com
1. Get authorization (obtain a TheUsher token) from The Usher by calling /self/token
1. Access one of the API endpoints like /add/ passing the TheUsher token for Authorization: Bearer, and values for the left and right operands.

The Glitch client application at https://my-theusher-client.glitch.me/ is a convenient front-end client that does all of the above.
