// ---- http-proxy-middleware-----

// const express = require('express');
// const { createProxyMiddleware } = require('http-proxy-middleware');
// const app = express();


// app.use('/log/*', createProxyMiddleware({ target: 'http://127.0.0.1:4000', changeOrigin: true }));
// app.use('/crud/*', createProxyMiddleware({ target: 'http://127.0.0.1:5000', changeOrigin: true }));

// app.listen(8000);

// ---------------  http-proxy  -------------


var express  = require('express');
var app      = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var serverOne = 'http://localhost:4000',
    ServerTwo = 'http://localhost:5000'
 
app.all("/log/*", function(req, res) {
    console.log('redirecting to Server1');
    apiProxy.web(req, res, {target: serverOne});
});

app.all("/crud/*", function(req, res) {
    console.log('redirecting to Server2');
    apiProxy.web(req, res, {target: ServerTwo});
});


app.listen(8000);
