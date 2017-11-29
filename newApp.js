const builder = require('botbuilder');
const restify = require('restify');
const tizi = require('./tizi');
// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot and listen to messages
var connector = new builder.ChatConnector({
	appId: "0def7aad-ad77-4e78-a590-c8e9588bbf5b",
	appPassword: "qeRQ553;ptojhGPQUM82{]?"
    // appId: process.env.MICROSOFT_APP_ID,
    // appPassword: process.env.MICROSOFT_APP_PASSWORD
});
server.post('/api/messages', connector.listen());

var bot = new builder.UniversalBot(connector);

// Execution.Initiation(bot);
tizi.Initiation(bot);
