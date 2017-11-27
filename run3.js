const builder = require('botbuilder');

module.exports.startDialog = function(bot) {
	console.log('run2 test phase1')
    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/e8413459-4ba3-4dbf-b41f-f98e34159da4?subscription-key=d1c174e41a47422aa30e74c7f2429503&verbose=true&timezoneOffset=0&q='); +

    bot.recognizer(recognizer);
		console.log ('run2 test phase2');




		bot.dialog('Welcome',
		        function(session, args) {
							var card = new builder.HeroCard(session)
							.title("Welcome Message")
							.subtitle("Hi, What can I help you with today?")
							.buttons([
									builder.CardAction.imBack(session, 'Accounts', '1.Accounts'),
									builder.CardAction.imBack(session, 'Exchanged Rate' , '2.Exchanged Rate'),
									builder.CardAction.imBack(session, 'IPB' , '3.IPB')
							])
							session.send(new builder.Message(session).addAttachment(card));
							// session.send("Hi, What can I help you with today? 1.Account 2. Exchange Rate 3. ABC ");
						    }).triggerAction({
		        matches: 'Welcome'
		    });





		bot.dialog('GetCalories', function(session, args) {
	            // Pulls out the food entity from the session if it exists
	            var foodEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'Food');

	            // Checks if the for entity was found
	            if (foodEntity) {
	                session.send('Calculating calories in %s...', foodEntity.entity);
	                nutrition.displayNutritionCards(foodEntity.entity, session);
	                // Insert logic here later
	            } else {
	                session.send("No food identified! Please try again");
	            }
	    }).triggerAction({
	        matches: 'GetCalories'
	    });

			bot.dialog('IPB',[

			    function (session) {
						session.send('There are 3 stages, 1.update balance, 2.view balance, 3.Anaylsis');
						builder.Prompts.text(session, 'Please enter which one you would like to go through');

			    },




					function (session,results){

						var Update = 'Update Balance';
						var View = 'View Balance';
						var Analysis = 'Analysis';
						var userinit = results.response;

						switch (userinit) {
					 	case Update:
							// return session.beginDialog(run2);
							// return session.beginDialog('aec');
						run2.startDialog(bot,session)


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





}
