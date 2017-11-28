const builder = require('botbuilder');
const transaction = require('./transactions');
const RestClient = require('./API/RestClient');

exports.Initiation = function(bot){
		var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/789c9db6-9302-4832-aaa3-672bd0c8e837?subscription-key=4649e4e63c4e4a3f9d633e97f0df546c&verbose=true&timezoneOffset=0&q=');
		bot.recognizer(recognizer);

	bot.dialog('Welcome', function(session, args) {
		var card = new builder.HeroCard(session)
	// 		.title("Bot Starting")
	// 		.subtitle("Hi please Sign-in or Sign-up to use the bot")
	// 		.buttons([
	// 					builder.CardAction.imBack(session, 'Sign In' , '1.Sign In'),
	// 					builder.CardAction.imBack(session, 'Sign Up' , '2.Sign Up')
	// 		])
	// 		session.send(new builder.Message(session).addAttachment(card));
	// 	}).triggerAction({
	// 				matches: 'Welcome'
	// 		});
  //
  //
	// 		bot.dialog('Sign In', [
	// 			function (session){
	// 				// session.send("Account page opened Please enter your ID");
	// 				builder.Prompts.text(session, "Please enter your ID");
	// 			},
	// 			function (session,results){
	// 				// builder.Prompts.text("Account page opened Please enter your ID");
	// 				session.send('Hit');
	// 				var userInput = results.response.text;
	// 				session.send(userInput);
	// 				session.send('Process');
  //
	// 			}
  //
	// 		])
	// 		.triggerAction({
	// 			matches: /^Sign In$/i,
	// 			confirmPrompt: "This will cancel your current request. Are you sure? [Yes, No]"
	// 		});
  //
  //
	// 			bot.dialog('Sign Up', function(session, args) {
	// 					session.send("Record your updates on transactions or type analysis to get advice on your financial status");
	// 					// builder.Prompts.text(session, "What would you like to do? 1.Update 2.View 3.Analysis");
	// 				}).triggerAction({
	// 					matches: /^Sign In$/i,
	// 					// confirmPrompt: "This will cancel your current request. Are you sure? [Yes, No]"
	// 				});




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
				session.send("Record your updates on transactions or type analysis to get advice on your financial status");
				// builder.Prompts.text(session, "What would you like to do? 1.Update 2.View 3.Analysis");


			}).triggerAction({
				matches: [/^IPB$/i, /^Intelligent Personal Budgeting$/i],
				// confirmPrompt: "This will cancel your current request. Are you sure? [Yes, No]"
			});

			bot.dialog('UpdateExpense',

				function(session,args,next){


					// var userinit = builder.EntityRecognizer.findEntity(args.intent.entities,'General');
					// var userinit2 = builder.EntityRecognizer.findEntity(args.intent.entities, 'Social');
					// var userinit3 = builder.EntityRecognizer.findEntity(args.intent.entities, 'Eat-out');
					var res;
					var exp = builder.EntityRecognizer.findEntity(args.intent.entities,'builtin.currency')

					// var ex = builder.EntityRecognizer.findEntity(args.intent.entities,'Social')
					// var exp = builder.EntityRecognizer.findEntity(args.intent.entities,'builtin.currency')



					//if statement to check intent type.
					if ((builder.EntityRecognizer.findEntity(args.intent.entities,'General') !== null) && (builder.EntityRecognizer.findEntity(args.intent.entities,'General') !==undefined)){
						res = builder.EntityRecognizer.findEntity(args.intent.entities,'General').type;
					}
					if ((builder.EntityRecognizer.findEntity(args.intent.entities, 'Social') !== null) && (builder.EntityRecognizer.findEntity(args.intent.entities, 'Social') !==undefined)){
						res = builder.EntityRecognizer.findEntity(args.intent.entities,'Social').type;
					}
					if ((builder.EntityRecognizer.findEntity(args.intent.entities, 'Eat-out') !== null) && (builder.EntityRecognizer.findEntity(args.intent.entities, 'Eat-out') !==undefined)){
						res = builder.EntityRecognizer.findEntity(args.intent.entities,'Eat-out').type;
					}
					if (res === undefined){
						var res = 'General';
					}

						session.send('%s Expense has increased by %s...',res, exp.entity);


						// console.log("this is res ", res);
						// console.log("This is exp ", exp.entity);
					})

	.triggerAction({
				matches: 'UpdateExpense'
		});

		bot.dialog('getExpense', [
		        function (session, args, next) {
		            session.dialogData.args = args || {};
		            if (!session.conversationData["username"]) {
		                builder.Prompts.text(session, "Enter a username to setup your account.");
		            } else {
		                next(); // Skip if we already have this info.
		            }
		        },

						function (session, results, next) {
								// session.dialogData.args = args || {};
								if (results.response) {
									session.conversationData["username"]=results.response;
								}
								if (!session.conversationData["Type"]) {
										builder.Prompts.text(session, "Enter expense account type you want to visit.");
								} else {
										next(); // Skip if we already have this info.
								}
						},


		        function (session, results, next) {
		            // if (!isAttachment(session)) {

		                if (results.response) {
		                    session.conversationData["Type"] = results.response;
		                }

										transaction.retrieveExpenses(session,session.conversationData["username"],session.conversationData["Type"]);  // <---- THIS LINE HERE IS WHAT WE NEED

		            // }
		        }
		    ]).triggerAction({
		        matches: 'GetBalance'
		    });

				bot.dialog('UserCheck', [
								function (session, args, next) {
										session.dialogData.args = args || {};
										if (!session.conversationData["username"]) {
												builder.Prompts.text(session, "Enter a username to setup your account.");
										} else {
												next(); // Skip if we already have this info.
										}
								},

								function (session, results, next) {
										// session.dialogData.args = args || {};
										if (results.response) {
											session.conversationData["username"]=results.response;
										}
										if (!session.conversationData["Type"]) {
												builder.Prompts.text(session, "Enter expense account type you want to visit.");
										} else {
												next(); // Skip if we already have this info.
										}
								},


								function (session, results, next) {
										// if (!isAttachment(session)) {

												if (results.response) {
														session.conversationData["Type"] = results.response;
												}

												transaction.readExpense(session,session.conversationData["username"],session.conversationData["Type"]);  // <---- THIS LINE HERE IS WHAT WE NEED

										// }
								}
							]).triggerAction({
					        matches: 'UserCheck'
					    });

//
// exports.expenseColumn = function(session, card){
//
// 	// session.send(new builder.Message(session).addAttachment(card));
//
// 	builder.Prompts.text(session, new builder.Message(session).addAttachment(card));
//
// },
//
// function(session, results){
// 	console.log("Results" + results.response)
//
// 	session.beginDialog(results.response);
// };

// bot.dialog('General', function(session, args){
// 		var url = 'https://rarabot.azurewebsites.net/tables/RaraBot';
// 		var username = session.conversationData["username"];
// 		RestClient.getExpense(url, session, username, HandleSocial);
// 	})
//
// .triggerAction({
// 	matches: 'General'
// });
//
//
//
// bot.dialog('eatout', function(session, args){
// 		var url = 'https://rarabot.azurewebsites.net/tables/RaraBot';
// 		var username = session.conversationData["username"];
// 		RestClient.getExpense(url, session, username, HandleSocial);
// 	})
//
// .triggerAction({
// 	matches: 'Eatout'
// });


//
// bot.dialog('Social', function(session, args){
// 		var url = 'https://rarabot.azurewebsites.net/tables/RaraBot';
// 		console.log("string" + args.value);
// 		var username = session.conversationData["username"];
// 		RestClient.getExpense(url, session, username, HandleSocial);
// 	})
//
// .triggerAction({
// 	// matches: ['Social','Eat-Out','General']
// 		matches: 'Social'
// });
//
//
// function HandleSocial(body, session, username){
// 	var contents = JSON.parse(body);
//
// 	for (element in contents){
// 		var usernameReceived = contents[element].UserName;
// 		var userExpenseType = contents[element].ExpenseType;
// 		var userBalance = contents[element].Balance
// 		// if (username == usernameReceived){
// 		}
//
// 		session.send(new builder.Message(session).addAttachment({
// 			contentType: "application/vnd.microsoft.card.adaptive",
// 			content: {
//     "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
//     "type": "AdaptiveCard",
//     "version": "1.0",
//     "body": [
//         {
//             "type": "Container",
//             "items": [
//                 {
//                     "type": "TextBlock",
//                     "text": "Your " + userExpenseType + " expense Account",
//                     "weight": "bolder",
//                     "size": "medium"
//                 },
//             ]
//         },
//         {
//             "type": "Container",
//             "items": [
//                 {
//                     "type": "FactSet",
//                     "facts": [
//                         {
//                             "title": "Name:",
//                             "value": username
//                         },
//                         {
//                             "title": "Paid by:",
//                             "value": "Master Cards"
//                         },
//                         {
//                             "title": "Most Spent Region",
//                             "value": "Auckland"
//                         },
// 												{
// 														"title": "Balance: ",
// 														"value": userBalance,
// 														"weight": "bolder",
// 														"size": "medium"
// 												}
//                     ]
//                 }
//             ]
//         }
//     ],
//     "actions": [
//         {
//             "type": "Action.ShowCard",
//             "title": "View Eat-out expense Account",
//             "card": {
//                 "type": "AdaptiveCard",
//                 "body": [
//                     {
// 											"title": "Amount spent: ",
// 											"value": "Auckland"
//                     }
//                 ]
//             }
//         },
//         {
//             "type": "Action.ShowCard",
//             "title": "View General expense Account",
//             "card": {
//                 "type": "AdaptiveCard",
//                 "body": [
//                     {
// 											"title": "Paid by:",
// 											"value": "Master Cards"
//                     }
//                 ],
//                 "actions": [
//                     {
//                         "type": "Action.Submit",
//                         "title": "OK"
//                     }]
//             }
//         },
//
//     ]
// }
// 		}));
//
// 			console.log('Steven Type is = %s ', userExpenseType)
// 			console.log('Steven Balance is =%s ', userBalance)

// }
// }



	// console.log(contents)
//
// bot.dialog('Social', function(session, args){
// 		var url = 'https://rarabot.azurewebsites.net/tables/RaraBot';
// 		var username = session.conversationData["username"];
// 		RestClient.getExpense(url, session, username, HandleSocial);
// 	})
//
// .triggerAction({
// 	matches: 'Social'
// });

x



// function HandleSocial(body, session, username){
// 	var contents = JSON.parse(body);
//
// 	for (element in contents){
// 		var usernameReceived = contents[element].UserName;
// 		var userExpenseType = contents[element].ExpenseType;
// 		var userBalance = contents[element].Balance
// 		if (username == usernameReceived){
// 			console.log('Steven Type is = $s ', userExpenseType)
// 			console.log('Steven Balance is =$s ', userBalance)
//
// 		}
//
//
//
//
//
// 	// console.log(contents)
// }
//
//
// }
}







	// bot.dialog('View', function(session, args) {
	// 			session.send("Which Balance would you like to access?");
	// 			// builder.Prompts.text(session, "What would you like to do? 1.Update 2.View 3.Analysis");
  //
  //
	// 		}).triggerAction({
	// 			matches: [/^IPB$/i, /^Intelligent Personal Budgeting$/i],
	// 			// confirmPrompt: "This will cancel your current request. Are you sure? [Yes, No]"
	// 		});










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
