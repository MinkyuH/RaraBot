const builder = require('botbuilder');
exports.FucntionStart = function(bot,session){

session.send("IDK");

session.send("IBP phase hit");

	var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/e8413459-4ba3-4dbf-b41f-f98e34159da4?subscription-key=d1c174e41a47422aa30e74c7f2429503&verbose=true&timezoneOffset=0&q='); +

	bot.recognizer(recognizer);


session.send("SecondHit")
	var selection = result.response.entity;
	switch (selection) {
			case selection == "GetCalories":
					return session.beginDialog('GetCalories');
}

		bot.dialog('GetCalories', function(session, args) {
			// if (!isAttachment(session)) {
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
			// }
	}).triggerAction({
			matches: 'GetCalories'
	});
}


//
// exports.Fucntiontwo = function(bot, session){
// 	session.send("I want you to pop me up");
// 	session.endConversation();
// 	IPB.FunctionStart(bot, session);





// 	console.log('IPB loaded');
// 	session.send('IPB script successfully loaded');
// };


// Some sections have been omitted
//
// exports.startDialog = function (bot) {
//
//     var luis = new builder.LuisRecognizer('dfd');
//
//     bot.luis(luis);
//
//     bot.dialog('Payment', function (session, args) {
//
//
//     }).triggerAction({
//         matches: 'Payment'
//     });
// }
