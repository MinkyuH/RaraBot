var rest = require('./API/RestClient');
const luis = require('./tizi');
var builder = require('botbuilder');
var nonLuis = require('./nonLuis');




 exports.Login = function loginF(userinput, session){
	 var url = 'https://rarabot.azurewebsites.net/tables/RaraBot';
	 rest.Login (userinput, session,url,Logincallback);
 }

function Logincallback (message, session, userinput) {
	var loginDetails = JSON.parse(message);
	var username2;
	// console.log("abcdfef ===== %s ", message)

	for (var name in loginDetails) {
		// console.log(loginDetails[name])
		if (loginDetails[name].UserName) {
			console.log('here' + userinput)
			if (loginDetails[name].UserName.toLowerCase() == userinput.toLowerCase()){
				session.send('Welcome %s', loginDetails[name].UserName);
				session.beginDialog('features')
				break;
			}
			}
		}
		session.send('Please sign up %s', userinput)
		session.beginDialog('Welcome')


		}
// 	for (var index in message){
// 		username2 = message[index].UserName;
// 		if (String(userinput).toLowerCase() === String(username2).toLowerCase()) {
// 			session.send("Hi %s", userinput)
// 			session.beginDialog('features')
// 		}
// 	}
// 	if (username2 === null || username2 === undefined){
// 		session.send("User doesn't exists in the db. Add user first")
// 		session.endConversation();
// }




exports.retrieveExpenses = function getExpense(session, username , type){
    var url = 'https://rarabot.azurewebsites.net/tables/RaraBot';
    rest.getExpense(url, session, username,type, checkuserexistence)
};

exports.readExpense = function getExpense(session, username , type){
    var url = 'https://rarabot.azurewebsites.net/tables/RaraBot';
    rest.getExpense(url, session, username,type, readiness)
};


function readiness (message,session,username,type){
	var url = 'https://rarabot.azurewebsites.net/tables/RaraBot';
	var userlist = JSON.parse(message);
	console.log("=========%s ",userlist);
	// console.log()
	var username2;
	var usertype2;
	for (var index in userlist){
		 username2 = userlist[index].UserName;
		 usertype2 = userlist[index].ExpenseType;
		 console.log ("-12-%s", username2);
		 console.log ("-1121-%s", usertype2);
		if (username.toLowerCase() === String(username2).toLowerCase() && type.toLowerCase() === String(usertype2).toLowerCase()) {
			session.send("UserName: %s   UserType: %s ",username2 , usertype2);
			session.endConversation();
		}
		}
		if (username2 === null || username2 === undefined){
			session.send("User doesn't exists in the db. Add user first")
			session.endConversation();
		}
	}


function checkuserexistence (message,session,username,type){
	var url = 'https://rarabot.azurewebsites.net/tables/RaraBot';
	// var userlist = JSON.parse(message);
	console.log("=========%s ",message);
	// console.log()
	var username2;
	var usertype2;
	for (var index in message){
		 username2 = message[index].UserName;
		 usertype2 = message[index].ExpenseType;
		if (username.toLowerCase() === String(username2).toLowerCase() && type.toLowerCase() === String(usertype2).toLowerCase()) {
			session.send("user exists in the db");
			session.endConversation();
		}
		}
		if (username2 === null || username2 === undefined){
			console.log('Null detected')
			rest.postExpense(url, session, username, type, updatefinished)
		}
	}

  //
	// function handleSignUp (message, session, username, password, dob){
	// 	// var userlist = JSON.parse(message);
	// 	session.send('Your username is %s', username);
  //
		// console.log()
		// var username2;
		// var usertype2;
		// for (var index in message){
		// 	 username2 = message[index].UserName;
		// 	 usertype2 = message[index].ExpenseType;
		// 	if (username.toLowerCase() === String(username2).toLowerCase() && type.toLowerCase() === String(usertype2).toLowerCase()) {
		// 		session.send("user exists in the db");
		// 		session.endConversation();
		// 	}
		// 	}
		// 	if (username2 === null || username2 === undefined){
		// 		console.log('Null detected')
		// 		rest.postExpense(url, session, username, type, updatefinished)
		// 	}
		// }


function updatefinished(message,session){
	session.send('done');
	session.endConversation();
}



function handleExpenses(message, session, username) {
    var accounttype = JSON.parse(message);
		// console.log(accounttype);
		// var cards = [];
    for (var account in accounttype) {


        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
				if (accounttype[account].UserName != null){
					// var usernameReceived = accounttype[account].UserName;
	        if (username.toLowerCase() === accounttype[account].UserName.toLowerCase()) {
						// var usernameReceived = accounttype[account].UserName;
		        // var userExpenseType = accounttype[account].ExpenseType;
						// var userBalance = accounttype[account].Balance
						var card = new builder.HeroCard(session)
								.title("Welcome Message")
								.subtitle("Please select the expense category you want to retreive")
								.buttons([
										builder.CardAction.imBack(session, 'Eat-Out', '1.Eat-Out'),
										builder.CardAction.imBack(session, 'Social' , '2.Social'),
										builder.CardAction.imBack(session, 'General' , '3.General')
								])
								// cards.push(card)


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
		luis.expenseColumn(session, card);

    // Print all favourite foods for the user that is currently logged in
    // session.send("%s, your $s expense balance is: %s", username, userExpenseType, userBalance);

}
