const builder = require('botbuilder');

exports.startDialog = function(bot,session) {
    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/e8413459-4ba3-4dbf-b41f-f98e34159da4?subscription-key=d1c174e41a47422aa30e74c7f2429503&verbose=true&timezoneOffset=0&q=');
    bot.recognizer(recognizer);
		session.send('run2 script')
		
		// runUpdate(bot,session,input);

// exports.runUpdate = function(bot,session, input) {
// 	session.send('Type-B');
//
// 	// var foodEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'Food');
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
// };


bot.dialog('Updated',[
    function (session,args,next) {
			// var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/e8413459-4ba3-4dbf-b41f-f98e34159da4?subscription-key=d1c174e41a47422aa30e74c7f2429503&verbose=true&timezoneOffset=0&q=');
			// bot.recognizer(recognizer);
			session.send('Type-B');
			var foodEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'Food');
			console.log('Myundo');
			session.send('MYundo');
			if (foodEntity) {

					session.send('Calculating calories in %s...', foodEntity.entity);
					//nutrition.displayNutritionCards(foodEntity.entity, session);
					// Insert logic here later
			} else {
					session.send("No food identified! Please try again");
			}
		}])
		.triggerAction({
			matches: 'GetCalories'
			});
		}
