const builder = require('botbuilder');

exports.Initiation = function(bot){
		var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/789c9db6-9302-4832-aaa3-672bd0c8e837?subscription-key=4649e4e63c4e4a3f9d633e97f0df546c&verbose=true&timezoneOffset=0&q=');
		bot.recognizer(recognizer);

	bot.dialog('Welcome', function(session, args) {
		var card = new builder.HeroCard(session)
				.title("Welcome Message")
				.subtitle("Hi, What can I help you with today?")
				.buttons([
						builder.CardAction.imBack(session, 'Accounts', '1.Accounts'),
						builder.CardAction.imBack(session, 'Exchanged Rate' , '2.Exchanged Rate'),
						builder.CardAction.imBack(session, 'IPB' , '3.IPB')
				])
				session.send(new builder.Message(session).addAttachment(card));
		    // session.send("Hi, What can I help you with today? 1.Account 2. Exchange Rate 3. ABC ");;

	}).triggerAction({
				matches: 'Welcome'
		});

		bot.dialog('IPB', function(session, args) {
      	session.send("What would you like to do? 1.Update 2.View 3.Analysis");
			}).triggerAction({
				matches: [/^IPB$/i, /^Intelligent Personal Budgeting$/i],
				// confirmPrompt: "This will cancel your current request. Are you sure? [Yes, No]"
			});

			bot.dialog('Update',[

				function(session,args,next){
					builder.Prompts.text(session, "What would you like to update?");
					next();

				},
				function(session, args) {
				var unknown = "";
				var updateEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'car');
				var updateMoney =  builder.EntityRecognizer.findEntity(args.intent.entities, 'builtin.currency');
				if (updateEntity && updateMoney) {
					session.send ('This expense is for ' , updateEntity , 'and updated by ' , updateMoney);
				}
				else{
					session.send('updated by ' , updateMoney);
				}
			}
		])
	.triggerAction({
				matches: 'Update'
		});
	}







//Test Cases
				// bot.dialog('GetCalories', function(session, args) {
				// 					// Pulls out the food entity from the session if it exists
				// 					var foodEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'Food');
				// 					if (foodEntity) {
				// 							session.send('Calculating calories in %s...', foodEntity.entity);
				// 							nutrition.displayNutritionCards(foodEntity.entity, session);
				// 							// Insert logic here later
				// 					} else {
				// 							session.send("No food identified! Please try again");
				// 			}
				// 	}).triggerAction({
				// 			matches: 'GetCalories'
				// 	});




//IPB hero cards
// bot.dialog('IPB', function(session,args){
// 	var card2 = new builder.HeroCard(session)
// 			.title("Welcome Message")
// 			.subtitle("Which transaction would you like to do?")
// 			.buttons([
// 					builder.CardAction.imBack(session, 'Update', '1.Update Balance'),
// 					builder.CardAction.imBack(session, 'View' , '2.View Transaction'),
// 					builder.CardAction.imBack(session, 'Analysis' , '3.Analsis')
// 			])
// 			session.send(new builder.Message(session).addAttachment(card2));
//
// }).triggerAction{(
// 	matches: [/^IPB$/i, /^Intelligent Personal Budgeting$/i],
// 	confirmPrompt: "This will cancel your current request. Are you sure? [Yes, No]"
// )}

//
// bot.dialog('Update',[
//
// function(session, args) {
// 	var unknown = "";
// 	var updateEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'Eat-out');
// 	var updateMoney =  builder.EntityRecognizer.findEntity(args.intent.entities, 'builtin.currency');
// 	if (updateEntity)
// },
//
// function(session)
//
//
// ])







//
//
//
// 	bot.dialog('GetCalories', function(session, args) {
// 					// Pulls out the food entity from the session if it exists
// 					var foodEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'Food');
// 					if (foodEntity) {
// 							session.send('Calculating calories in %s...', foodEntity.entity);
// 							nutrition.displayNutritionCards(foodEntity.entity, session);
// 							// Insert logic here later
// 					} else {
// 							session.send("No food identified! Please try again");
// 			}
// 	}).triggerAction({
// 			matches: 'GetCalories'
// 	});
//
//
// }
//
//
// 	    .onDefault(require('./Rara')));
//
//
//
// }
//
//
// exports.FunctionT = function(bot,session){
// 	console.log('RARA accepted');
// 	session.send('Rara script executed');
// // };
