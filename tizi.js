const builder = require('botbuilder');
const transaction = require('./transactions');
const RestClient = require('./API/RestClient');
const customVision = require('./CustomVision');


exports.Initiation = function(bot){
		var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/854306ca-8c0e-46f2-9af6-51f503c47752?subscription-key=59b354b113f646a19b41f9b62367cf26&verbose=true&timezoneOffset=0&q=');
		bot.recognizer(recognizer);

	bot.dialog('Welcome', function(session, args) {
		if (!isAttachment(session)) {

		var card = new builder.HeroCard(session)
			.title("Bot Starting")
			.subtitle("Hi please Sign-in or Sign-up to use the bot")
			.buttons([
						builder.CardAction.imBack(session, 'Sign In' , '1.Sign In'),
						builder.CardAction.imBack(session, 'Sign Up' , '2.Sign Up')
			])
		}
			session.send(new builder.Message(session).addAttachment(card));
		}).triggerAction({
					matches: 'Welcome'
			});
  //

			bot.dialog('Sign In', [
				function (session,args,next){
					if (!isAttachment(session)) {

					session.dialogData.args = args || {};
					if (!session.conversationData["username"]){
						builder.Prompts.text(session, "Please enter your ID");
					} else {
						next();
					}
				}
					// session.send("Account page opened Please enter your ID");
				},
				function (session,results){
					if (!isAttachment(session)) {

					if (results.response) {
						session.conversationData["username"] =results.response;
						console.log(session.conversationData["username"]);
					}
					// var url = 'https://rarabot.azurewebsites.net/tables/RaraBot';
					transaction.Login(session, session.conversationData["username"]);
}
				}


			])
			.triggerAction({
				matches: /^Sign In$/i,
				// confirmPrompt: "This will cancel your current request. Are you sure? [Yes, No]"
			});
  //


				bot.dialog('Sign Up', [
					function (session){
						if (!isAttachment(session)) {
						//msg will be filled out form
						var url = 'https://rarabot.azurewebsites.net/tables/RaraBot'
						// session.dialogData.args = args || {};
						if (session.message && session.message.value) {
						// session.send("Account page opened Please enter your ID");
						// builder.Prompts.text(session, "Please enter your ID");
						// session.dialogData.args = args || {};

						session.conversationData['username'] = session.message.value.username;

							var username = session.message.value.username;
							var password = session.message.value.password;
							var dob = session.message.value.dob;
							var Social = session.message.value.ExpenseType;
							RestClient.postSignUp(url,session,username,password,dob,Social, transaction.handleSignUp);
							// console.log("Sign Up calling postSignUp")
						} else {
							var signUp = {
								contentType: "application/vnd.microsoft.card.adaptive",
								content: {
									type: "AdaptiveCard",
									body: [{
										"type": "TextBlock",
										"text": "Sign Up Form",
										"size": "large",
										"weight": "bolder"
									},
									{
										"type": "TextBlock",
		                  "text": "Username: "
									},
									{
										"type": "Input.Text",
	                  "id": "username",
	                  "placeholder": "Enter your username..."
									},
									{
										"type": "TextBlock",
		                  "text": "Password: "
									},
									{
										"type": "Input.Text",
	                  "id": "password",
	                  "placeholder": "Enter your password..."
									},
									{
										"type": "TextBlock",
		                  "text": "Date of Birth: "
									},
									{
										"type": "Input.Text",
	                  "id": "dob",
	                  "placeholder": "Enter your date of birth (dd/mm/yy)..."
									},
									{
											"type": "TextBlock",
											"text": "Expense Account Type: "
									},
									{
										"type": "Input.Text",
										"id": "ExpenseType",
										"placeholder": "Enter your expense account you with to monitor."
									}
								],
									actions: [{
		                "type": "Action.Submit",
		                "title": "Sign Up"
		            	}]
								}
							}
							session.send(new builder.Message(session).addAttachment(signUp));
						}
					}
					},
					function (session,results){
						if (!isAttachment(session)) {


						var username = results.response;
						// var url = 'https://rarabot.azurewebsites.net/tables/RaraBot';
						transaction.Login(username, session);

					}

}
				])
				.triggerAction({
					matches: /^Sign Up$/i,
					// confirmPrompt: "This will cancel your current request. Are you sure? [Yes, No]"
				});






  //
				// bot.dialog('Sign Up', function(session, args) {
				// 		session.send("Please type your password");
				// 		// builder.Prompts.text(session, "What would you like to do? 1.Update 2.View 3.Analysis");
				// 	}).triggerAction({
				// 		matches: /^Sign In$/i,
				// 		// confirmPrompt: "This will cancel your current request. Are you sure? [Yes, No]"
				// 	});



				bot.dialog('features', function(session, args) {
					if (!isAttachment(session)) {

					var card = new builder.HeroCard(session)
				.title("Welcome ")
				.subtitle("Hi, What can I help you with today?")
				.buttons([
						builder.CardAction.imBack(session, 'Accounts Deletion', '1.Accounts'),
						builder.CardAction.imBack(session, 'Exchanged Rate' , '2.Exchanged Rate'),
						builder.CardAction.imBack(session, 'IPB' , '3.IPB'),
						builder.CardAction.imBack(session, 'Help' , '4.Help')
				])
				session.send(new builder.Message(session).addAttachment(card));
		    // session.send("Hi, What can I help you with today? 1.Account 2. Exchange Rate 3. ABC ");;
}
	}).triggerAction({
				matches: 'features'
		});

		bot.dialog('Help', function(session){
			session.send("This section is to help users with the functionality of bots. To access our cognitive service, just type in the url of the image and you will get an response from the bot whether the note is $5, $10 , $20 dollar notes!")


		}).triggerAction({
						matches: /^Help$/i,
						// confirmPrompt: "This will cancel your current request. Are you sure? [Yes, No]"
		});



		bot.dialog('Accounts', [function(session, args,next) {
			if (!isAttachment(session)) {
				session.dialogData.args = args || {};
				if (!session.conversationData["delType"]){
					builder.Prompts.text(session, "Are you sure you want to delete this account?");
				} else {
					next();
				}
			// session.beginDialog('features');
		}
	}, function(session,results) {
		session.conversationData["delType"]=results.response;
		transaction.manageAccounts(session);
	// session.send("Accounts Executed");
	}
]).triggerAction({
			matches: 'Accounts'
		});

		// exports.deleteType = function(session){
		// 	builder.Prompts
		// }

		bot.dialog('IPB', function(session, args) {
			if (!isAttachment(session)) {

				session.send("Record your updates on transactions or type view expense balance");
				// builder.Prompts.text(session, "What would you like to do? 1.Update 2.View 3.Analysis");
}

			}).triggerAction({
				matches: [/^IPB$/i, /^Intelligent Personal Budgeting$/i],
				// confirmPrompt: "This will cancel your current request. Are you sure? [Yes, No]"
			});

// 			bot.dialog('Exchanged Rate', [
// 			        function(session) {
// 			            if (session.message && session.message.value) {
// 			                // session.send("Account page opened Please enter your ID");
// 			                // builder.Prompts.text(session, "Please enter your ID");
// 			                var base = session.message.value.base;
// 			                var symbol = session.message.value.symbol;
// 			                var total = session.message.value.total;
// 			                console.log("%s %s %s", base, symbol, total);
// 			                transaction.retreiveExchange(session, base, symbol, total);
// }}
// ]);
//
bot.dialog('Exchanged Rate', [
				function(session) {
						if (session.message && session.message.value) {
								// session.send("Account page opened Please enter your ID");
								// builder.Prompts.text(session, "Please enter your ID");
								var base = session.message.value.base;
								var symbol = session.message.value.symbol;
								var total = session.message.value.total;
								console.log("%s %s %s", base, symbol, total);
								transaction.retreiveExchange(session, base, symbol, total);
					}
					else {
		 			var exchange = {
		 				contentType: "application/vnd.microsoft.card.adaptive",
		 				content: {
		 					type: "AdaptiveCard",
		 					body: [{
		 						"type": "TextBlock",
		 						"text": "Currency Converter",
		 						"size": "large",
		 						"weight": "bolder"
		 					},
		 					{
		 						"type": "TextBlock",
		 							"text": "Convert from: "
		 					},
		 					{
		 						"type": "Input.ChoiceSet",
		 						"id": "base",
		 						"style:": "compact",
								"choices": [{
													"title":"Australia (dollar)",
													"value": "AUD"
												},
													{
													"title":"Bulgaria (Lev)",
													"value": "BGN"
												},
												{
													"title":"Brazil (Real)",
													"value": "BRL"
												},
												{
													"title":"Cananda (Dollar)",
													"value": "CAD"
												},
												{
													"title":"Switzerland (Franc)",
													"value": "CHF"
												},
											  {
													"title":"China (Yuan)",
													"value": "CNY"
												},
												{
													"title":"Czech (Koruna)",
													"value": "CZK"
												},
												{
													"title":"Denmark (Krone)",
													"value": "DKK"
												},
												{
													"title":"United Kingdom (Pound)",
													"value": "GBP"
												},
												{
													"title":"Hong Kong (Dollar)",
													"value": "HKD"
												},
												{
													"title":"Croatia (Kuna)",
													"value": "HRK"
												},
												{
													"title":"Hungary (Forint)",
													"value": "HUF"
												},
												{
													"title":"Indonesia (Rupiah)",
													"value": "IDR"
												},
												{
													"title":"Israel (Israeli new shekel)",
													"value": "ILS"
												},
												{
													"title":"India (Rupee)",
													"value": "INR"
												},
												{
													"title":"Japan (Yen)",
													"value": "BGN"
												},
												{
													"title":"Republic of Korea (Won)",
													"value": "KRW"
												},
												{
													"title":"Mexico (Peso)",
													"value": "MXN"
												},
												{
													"title":"Malaysia (Ringgit)",
													"value": "MYR"
												},
												{
													"title":"Norway (Krone)",
													"value": "NOK"
												},
												{
													"title":"New Zealand (Dollar)",
													"value": "NZD"
												},
												{
													"title":"Philippines (Peso)",
													"value": "PHP"
												},
												{
													"title":"Bulgarian (BGN)",
													"value": "BGN"
												},
												{
													"title":"Poland (Zloty)",
													"value": "BGN"
												},
												{
													"title":"Romania (Leu)",
													"value": "RON"
												},
												{
													"title":"Russia (Ruble)",
													"value": "RUB"
												},
												{
													"title":"Sweden (Krona)",
													"value": "SEK"
												},
												{
													"title":"Singapore (Dollar)",
													"value": "SGD"
												},
												{
													"title":"Thailand (Baht)",
													"value": "TGB"
												},
												{
													"title":"Turkey (Lira)",
													"value": "TRY"
												},
												{
													"title":"United States (Dollar)",
													"value": "USD"
												},
												{
													"title":"South Africa (Rand)",
													"value": "ZAR"
												}
										]
										},

		 					{
		 						"type": "TextBlock",
		 							"text": "To: "
		 					},
		 					{
		 						"type": "Input.ChoiceSet",
		 						"id": "symbol",
		 						"style": "compact",
								"choices": [{
													"title":"Australia (dollar)",
													"value": "AUD"
												},
													{
													"title":"Bulgaria (Lev)",
													"value": "BGN"
												},
												{
													"title":"Brazil (Real)",
													"value": "BRL"
												},
												{
													"title":"Cananda (Dollar)",
													"value": "CAD"
												},
												{
													"title":"Switzerland (Franc)",
													"value": "CHF"
												},
												{
													"title":"China (Yuan)",
													"value": "CNY"
												},
												{
													"title":"Czech (Koruna)",
													"value": "CZK"
												},
												{
													"title":"Denmark (Krone)",
													"value": "DKK"
												},
												{
													"title":"United Kingdom (Pound)",
													"value": "GBP"
												},
												{
													"title":"Hong Kong (Dollar)",
													"value": "HKD"
												},
												{
													"title":"Croatia (Kuna)",
													"value": "HRK"
												},
												{
													"title":"Hungary (Forint)",
													"value": "HUF"
												},
												{
													"title":"Indonesia (Rupiah)",
													"value": "IDR"
												},
												{
													"title":"Israel (Israeli new shekel)",
													"value": "ILS"
												},
												{
													"title":"India (Rupee)",
													"value": "INR"
												},
												{
													"title":"Japan (Yen)",
													"value": "BGN"
												},
												{
													"title":"Republic of Korea (Won)",
													"value": "KRW"
												},
												{
													"title":"Mexico (Peso)",
													"value": "MXN"
												},
												{
													"title":"Malaysia (Ringgit)",
													"value": "MYR"
												},
												{
													"title":"Norway (Krone)",
													"value": "NOK"
												},
												{
													"title":"New Zealand (Dollar)",
													"value": "NZD"
												},
												{
													"title":"Philippines (Peso)",
													"value": "PHP"
												},
												{
													"title":"Bulgarian (BGN)",
													"value": "BGN"
												},
												{
													"title":"Poland (Zloty)",
													"value": "BGN"
												},
												{
													"title":"Romania (Leu)",
													"value": "RON"
												},
												{
													"title":"Russia (Ruble)",
													"value": "RUB"
												},
												{
													"title":"Sweden (Krona)",
													"value": "SEK"
												},
												{
													"title":"Singapore (Dollar)",
													"value": "SGD"
												},
												{
													"title":"Thailand (Baht)",
													"value": "TGB"
												},
												{
													"title":"Turkey (Lira)",
													"value": "TRY"
												},
												{
													"title":"United States (Dollar)",
													"value": "USD"
												},
												{
													"title":"South Africa (Rand)",
													"value": "ZAR"
												}]
		 					},
		 					{
		 						"type": "TextBlock",
		 							"text": "Amount"
		 					},
		 					{
		 						"type": "Input.Text",
		 						"id": "total",
		 						"placeholder": "Enter anount to convert..."
		 					}
		 				],
		 					actions: [{
		 						"type": "Action.Submit",
		 						"title": "Submit"
		 					}]
		 				}

		 			};
		 			session.send(new builder.Message(session).addAttachment(exchange));
		 		}

}]).triggerAction({
	matches: 'ExchangeRate'
});


			bot.dialog('UpdateExpense',

				function(session,args,next){
					if (!isAttachment(session)) {



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
					if (!session.conversationData["Type"]) {
						session.conversationData["Type"]=res;
					}
					if (!session.conversationData["Price"]) {
						session.conversationData["Price"]=exp.entity;
					}

						session.send('%s Expense has increased by %s...',session.conversationData["Type"],session.conversationData["Price"]);
						transaction.retrieveExpenses(session,session.conversationData["username"],session.conversationData["Type"],session.conversationData["Price"]);  // <---- THIS LINE HERE IS WHAT WE NEED

}
						// console.log("this is res ", res);
						// console.log("This is exp ", exp.entity);
					})

	.triggerAction({
				matches: 'UpdateExpense'
		});

		bot.dialog('getExpense', [
		        function (session, args, next) {
							if (!isAttachment(session)) {

		            session.dialogData.args = args || {};
		            if (!session.conversationData["username"]) {
		                builder.Prompts.text(session, "Please enter your username to continue.");
		            } else {
		                next(); // Skip if we already have this info.
		            }
							}
		        },

						function (session, results, next) {
							if (!isAttachment(session)) {

								// session.dialogData.args = args || {};
								if (results.response) {
									session.conversationData["username"]=results.response;
								}
								if (!session.conversationData["Type"]) {
										builder.Prompts.text(session, "Enter the expense account type you want to visit.");
								} else {
										next(); // Skip if we already have this info.
								}
							}
						},


						function (session, results, next) {
							if (!isAttachment(session)) {

								// session.dialogData.args = args || {};
								if (results.response) {
									session.conversationData["Type"]=results.response;
								}
										next(); // Skip if we already have this info.

							}
						},


		        function (session, results, next) {
		            if (!isAttachment(session)) {

									session.send("Get Balance done");
									session.conversationData["fromGetExpense"] = true;
									console.log(session.conversationData)
									var x = session.conversationData["username"]
									var y = session.conversationData["Type"]
									console.log("fifusbv" + x)
									transaction.retrieveExpenses(session,x,y,"0");  // <---- THIS LINE HERE IS WHAT WE NEED

		            }
		        }
		    ]).triggerAction({
		        matches: 'GetBalance'
		    });

		function isAttachment(session) {
    var msg = session.message.text;
    if ((session.message.attachments && session.message.attachments.length > 0) || msg.includes("http")) {
        //call custom vision
        customVision.retreiveMessage(session);

        return true;
    } else {
        return false;
    }
}
}
