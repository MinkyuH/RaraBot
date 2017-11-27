const builder = require('botbuilder');



exports.programinitialise = function(bot) {


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
	};

// HeroCards created to help users to choose the options
