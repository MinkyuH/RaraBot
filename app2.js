const builder = require('botbuilder');
const restify = require('restify');
const Rara = require('./Rara');
const IPB = require('./IPB');
const Execution = require('./Execution');
const run2 = require('./run2');

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


var bot = new builder.UniversalBot(connector);
Execution.Initiation(bot);





//
// // HeroCards created to help users to choose the options
// var bot = new builder.UniversalBot(connector, function(session){
// 		var card = new builder.HeroCard(session)
// 		//var constraint = 1;
// 		.title("Welcome Message")
// 		.subtitle("Hi, What can I help you with today?")
// 		.buttons([
// 				builder.CardAction.imBack(session, 'Accounts', '1.Accounts'),
// 				builder.CardAction.imBack(session, 'Exchanged Rate' , '2.Exchanged Rate'),
// 				builder.CardAction.imBack(session, 'IPB' , '3.IPB')
// 		])
// 		session.send(new builder.Message(session).addAttachment(card));
//     // session.send("Hi, What can I help you with today? 1.Account 2. Exchange Rate 3. ABC ");
// });
//
// //Using Rara to demonstarte Business Decisions
// bot.dialog('RaraExecution', [
//     function (session) {
// 			Rara.FunctionT(bot,session)
//     }
// ])
// .triggerAction({
//     matches: /^Hello Rara$/i,
//     confirmPrompt: "This will cancel your current request. Are you sure?"
// });
//
// //Excutes when user types Accounts
// bot.dialog('Accounts', [
// 	function (session){
// 		// session.send("Account page opened Please enter your ID");
// 		builder.Prompts.text(session, "Account page opened. Please enter your ID");
// 	},
// 	function (session,results){
// 		// builder.Prompts.text("Account page opened Please enter your ID");
// 		session.send('Hit');
// 		var userInput = results.response.text;
// 		session.send(userInput);
// 		session.send('Process');
//
// 	}
// ])
// .triggerAction({
// 	matches: /^Accounts$/i,
// 	confirmPrompt: "This will cancel your current request. Are you sure? [Yes, No]"
// });
//
// //Exchanged Rate Phase
// bot.dialog('ExchangeRate', [
// 	function (session){
// 		session.send("Exchange Rate phase");
// 	},
// 	function (session,results){
// 		// builder.Prompts.text("Account page opened Please enter your ID");
// 		session.send('Hit');
// 		var userInput = results.response.text;
// 		session.send(userInput);
// 		session.send('Process');
//
// 	}
// ])
// .triggerAction({
// 	matches: /^Exchanged Rate$/i,
// 	confirmPrompt: "This will cancel your current request. Are you sure? [Yes, No]"
// });
//
// //Intelligent Personal Budgeting Phase
//
// bot.dialog('IPB',[
//     function (session) {
// 			session.send('Hi app.js is running and this is the first IPB phase');
// 			// Execution.FucntionStart(bot,session)
//     },
// 		function (session){
// 		IPB.startDialog(bot,session)
// }])
// .triggerAction({
//     matches: [/^IPB$/i, /^Intelligent Personal Budgeting$/i],
//     confirmPrompt: "This will cancel your current request. Are you sure? [Yes, No]"
// });
//
// // bot.dialog('IPB',[
// //     function (session) {
// // 			IPB.startDialog(bot,session)
// //     }
// // ])
// // .triggerAction({
// //     matches: [/^IPB$/i, /^Intelligent Personal Budgeting$/i],
// //     confirmPrompt: "This will cancel your current request. Are you sure? [Yes, No]"
// // });
