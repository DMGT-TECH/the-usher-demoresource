const cors = require('cors');
const express = require('express');
const oasTools = require('oas-tools');
const jsyaml = require('js-yaml');
const fs = require('fs');
const http = require('http');
const { verifyTokenMiddleware } = require('./security_layer/jwt_signature_validator.js');

const options_object = {
      controllers: __dirname + '/api_endpoints',
      checkControllers: false,
      loglevel: 'info',
      logfile: './logs.txt',
      strict: true,
      router: true,
      validator: true,
      docs: null, // Swap this line with next if you want hosted Swagger docs (may not work deployed as cloud function)
      //docs: { apiDocs: '/api-docs', apiDocsPrefix: '', swaggerUi: '/docs', swaggerUiPrefix: '' },
      ignoreUnknownFormats: true,
      oasSecurity: true,
      securityFile: {
          bearerSelfAuth: verifyTokenMiddleware
      }
};

var spec = fs.readFileSync('math-service-openapi-spec.yaml', 'utf8');
var oasDoc = jsyaml.safeLoad(spec);
var expressApp = express();
expressApp.use(express.json());
expressApp.use(cors());
oasTools.configure(options_object);
oasTools.initialize(oasDoc, expressApp, function() {
    http.createServer(expressApp).listen(process.env.PORT, function() {
        console.log("App is up and running!");
    });
});
