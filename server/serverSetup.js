/*
	Server Setup
 */
var express = require("express");
var http = require("http");
var path = require("path");
var bodyParser = require("body-parser");
var config = require("config");

var app = express();

// SERVER SETUP -----------------------------------
// port setting
var port = process.env.PORT || config.serverSetup.listen_port;
app.set('port', port);

// view engine
app.set('views', path.join(__dirname, '../client/views'));
app.set('view engine', 'jade');

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// default resource place
app.use(express.static(path.join(__dirname, '../public')));

// ROUTING ----------------------------------------
var routes = require("../server/routeManage.js")(app);

// SERVER BUILD -----------------------------------
// listen on PORT
var server = http.createServer(app);
server.listen(port);

module.exports = server;
