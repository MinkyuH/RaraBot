const builder = require('botbuilder');
const restify = require('restify');
const Rara = require('./Rara')

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot and listen to messages
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
server.post('/api/messages', connector.listen());



// Using Rara to demonstarte Business Decisions
var bot = new builder.UniversalBot(connector, function(session){
		var card = new builder.HeroCard(session)
		//var constraint = 1;
		.title("Welcome Message")
		.subtitle("Hi, What can I help you with today?")
		.buttons([
				builder.CardAction.imBack(session, 'Accounts', '1.Accounts'),
				builder.CardAction.imBack(session, 'Exchanged Rate' , '2.Exchanged Rate'),
				builder.CardAction.imBack(session, 'ABC' , '3.ABC')
		])
		session.send(new builder.Message(session).addAttachment(card));
    // session.send("Hi, What can I help you with today? 1.Account 2. Exchange Rate 3. ABC ");
});

bot.dialog('RaraExecution', [
    function (session) {
			Rara.FunctionT(bot,session)
    }
])
.triggerAction({
    matches: /^Hello Rara$/i,
    confirmPrompt: "This will cancel your current request. Are you sure?"
});
