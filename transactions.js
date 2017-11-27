var rest = require('./API/RestClient');
const luis = require('./tizi');
var builder = require('botbuilder');
var nonLuis = require('./nonLuis');


exports.retrieveExpenses = function getExpense(session, username){
    var url = 'https://rarabot.azurewebsites.net/tables/RaraBot';
    rest.getExpense(url, session, username, handleExpenses)
};



function handleExpenses(message, session, username) {
    var accounttype = JSON.parse(message);
		console.log(accounttype);

    for (var account in accounttype) {


        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
				if (accounttype[account].UserName != null){
					// var usernameReceived = accounttype[account].UserName;
	        if (username.toLowerCase() === accounttype[account].UserName.toLowerCase()) {
						var usernameReceived = accounttype[account].UserName;
		        var userExpenseType = accounttype[account].ExpenseType;
						var userBalance = accounttype[account].Balance
						var card = new builder.HeroCard(session)
								.title("Welcome Message")
								.subtitle("Hi, What can I help you with today?")
								.buttons([
										builder.CardAction.imBack(session, 'Eat-Out', '1.Eat-Out'),
										builder.CardAction.imBack(session, 'Social' , '2.Social'),
										builder.CardAction.imBack(session, 'General' , '3.General')
								])
								luis.expenseColumn(session, card);
								break;
	            //Add a comma after all favourite foods unless last one



	            // if(favouriteFoodResponse.length - 1) {
	            //     allFoods.push(favouriteFood);
	            // }
	            // else {
	            //     allFoods.push(favouriteFood + ', ');
	            // }
	        }
				}
    }

    // Print all favourite foods for the user that is currently logged in
    // session.send("%s, your $s expense balance is: %s", username, userExpenseType, userBalance);

}
