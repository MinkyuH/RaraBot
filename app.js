const builder = require('botbuilder');
const restify = require('restify');
const Rara = require('./Rara');
const IPB = require('./IPB');
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

// HeroCards created to help users to choose the options
var bot = new builder.UniversalBot(connector, function(session){
		var card = new builder.HeroCard(session)
		//var constraint = 1;
		.title("Welcome Message")
		.subtitle("Hi, What can I help you with today?")
		.buttons([
				builder.CardAction.imBack(session, 'Accounts', '1.Accounts'),
				builder.CardAction.imBack(session, 'Exchanged Rate' , '2.Exchanged Rate'),
				builder.CardAction.imBack(session, 'IPB' , '3.IPB')
		])
		session.send(new builder.Message(session).addAttachment(card));
    // session.send("Hi, What can I help you with today? 1.Account 2. Exchange Rate 3. ABC ");
});


//Using Rara to demonstarte Business Decisions
bot.dialog('RaraExecution', [
    function (session) {
			Rara.FunctionT(bot,session)
    }
])
.triggerAction({
    matches: /^Hello Rara$/i,
    confirmPrompt: "This will cancel your current request. Are you sure?"
});

//Excutes when user types Accounts
bot.dialog('Accounts', [
	function (session){
		// session.send("Account page opened Please enter your ID");
		builder.Prompts.text(session, "Account page opened. Please enter your ID");
	},
	function (session,results){
		// builder.Prompts.text("Account page opened Please enter your ID");
		session.send('Hit');
		var userInput = results.response.text;
		session.send(userInput);
		session.send('Process');

	}
])
.triggerAction({
	matches: /^Accounts$/i,
	confirmPrompt: "This will cancel your current request. Are you sure? [Yes, No]"
});

//Exchanged Rate Phase
bot.dialog('ExchangeRate', [
	function (session){
		session.send("Exchange Rate phase");
	},
	function (session,results){
		// builder.Prompts.text("Account page opened Please enter your ID");
		session.send('Hit');
		var userInput = results.response.text;
		session.send(userInput);
		session.send('Process');

	}
])
.triggerAction({
	matches: /^Exchanged Rate$/i,
	confirmPrompt: "This will cancel your current request. Are you sure? [Yes, No]"
});

//Intelligent Personal Budgeting Phase

bot.dialog('IPB',[

    function (session,results) {
			session.send('There are 3 stages, 1.update balance, 2.view balance, 3.Anaylsis');
			builder.Prompts.text(session, 'Please enter which one you would like to go through');
},




		function (session,results){

			var Update = 'Update Balance';
			var View = 'View Balance';
			var Analysis = 'Analysis';
			var userinit = results.response;

			if (userinit == Update){
				session.send('hi executed');
				run2.startDialog(bot,session);
				console.log('returned');

			// switch (userinit) {
		 	// case Update:
			// 	// return session.beginDialog(run2);
			// 	// return session.beginDialog('aec');
			// // run2.startDialog(bot,session);
			// //run2.runUpdate(bot,session, userinit);
			// console.log("Returned");


      //
		 	// case View:
			// 	 return session.beginDialog('View');
			// case Analysis:
			// 	return session.beginDialog('Analysis');
		}
	}

])
.triggerAction({
    matches: [/^IPB$/i, /^Intelligent Personal Budgeting$/i],
    confirmPrompt: "This will cancel your current request. Are you sure? [Yes, No]"
});





//Test case for Luis
// bot.dialog('Updated',[
//     function (session,args,next) {
// 			var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/e8413459-4ba3-4dbf-b41f-f98e34159da4?subscription-key=d1c174e41a47422aa30e74c7f2429503&verbose=true&timezoneOffset=0&q=');
// 			bot.recognizer(recognizer);
// 			session.send('Type-B');
// 			var foodEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'Food');
// 			console.log('Myundo');
// 			session.send('MYundo');
// 			if (foodEntity) {
//
// 					session.send('Calculating calories in %s...', foodEntity.entity);
// 					nutrition.displayNutritionCards(foodEntity.entity, session);
// 					// Insert logic here later
// 			} else {
// 					session.send("No food identified! Please try again");
// 			}
// 		}])
// 		.triggerAction({
// 			matches: 'GetCalories'
// 			});

			// var userentitiy = results.response.entity;
			// session.log(userentitiy);
    // },
		// function (session,results, userentitiy){
		// 	var foodEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'Food');
		// 	console.log('Myundo');
		// 	session.send('MYundo');
		// 	if (foodEntity) {
    //
		// 			session.send('Calculating calories in %s...', foodEntity.entity);
		// 			nutrition.displayNutritionCards(foodEntity.entity, session);
		// 			// Insert logic here later
		// 	} else {
		// 			session.send("No food identified! Please try again");
		// 	}
		// }])
		// .triggerAction({
		// 	matches: 'GetCalories'
		// 	});







		// bot.dialog('GetCalories', function(session, args) {
		// 				// Pulls out the food entity from the session if it exists
		// 				var foodEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'Food');
		// 				if (foodEntity) {
		// 						session.send('Calculating calories in %s...', foodEntity.entity);
		// 						nutrition.displayNutritionCards(foodEntity.entity, session);
		// 						// Insert logic here later
		// 				} else {
		// 						session.send("No food identified! Please try again");
		// 		}
		// }).triggerAction({
		// 		matches: 'GetCalories'
		// });
// bot.dialog('IPB',[
//     function (session) {
// 			IPB.startDialog(bot,session)
//     }
// ])
// .triggerAction({
//     matches: [/^IPB$/i, /^Intelligent Personal Budgeting$/i],
//     confirmPrompt: "This will cancel your current request. Are you sure? [Yes, No]"
// });
