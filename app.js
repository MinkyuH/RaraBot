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
var bot = new builder.UniversalBot(connector, function (session, next) {
var userInput = session.message.text;
if (userInput == "Hello Rara"){
session.send('Hit');
Rara.FunctionT(bot,session);
session.send('process');
}
else{
session.endDialog("Test Minkyu phase1 ");
bot.dialog("AccountPhase", [
	function(session, next){
		session.send("You have successfully made it to the Account Phase");
		next();
	},
	function(session, results, next){
		var userInput = results.response;
		session.send('What you typed: ' , userInput);
	}
])
.triggerAction({
	matches: /^Account$/i,
	confirmPrompt: "This will cancle your transaction. Are you sure?"
})
bot.dialog('help', function (session, args, next) {
    session.endDialog("HelpPhase");
})
.triggerAction({
    matches: /^help$/i,
    onSelectAction: (session, args, next) => {
        // Add the help dialog to the dialog stack
        // (override the default behavior of replacing the stack)
        session.beginDialog(args.action, args);
    }
});
}
});
