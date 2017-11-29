var rest = require('./API/RestClient');
const luis = require('./tizi');
var builder = require('botbuilder');
var nonLuis = require('./nonLuis');


exports.retreiveExchange = function(session, base, symbol, total) {
    var url = 'https://api.fixer.io/latest?base=' + base + '&symbols =' + symbol;
    rest.getExchangeData(url, session, ExchangeHandlerResponse, base, symbol, total)

}


function ExchangeHandlerResponse(message, session, base, symbol, total) {
    var conversion = JSON.parse(message).rates;
    console.log(conversion);
    console.log(conversion[symbol]);
    var converted = conversion[symbol] * total;
    var exchange = total.toString() + ' ' + base + ' is ' + converted.toString() + ' ' + symbol;

    var card = new builder.HeroCard(session)
        .title('Exchange Rate')
        .text(exchange);

    session.send(new builder.Message(session).addAttachment(card));
    session.delay(2000);
    session.beginDialog("Welcome");
}





 exports.Login = function Login(session, userinput){
	 var url = 'https://rarabot.azurewebsites.net/tables/RaraBot';
	 rest.Login (userinput, session,url,Logincallback);
 }

function Logincallback (message, session, userinput) {
	var loginDetails = JSON.parse(message);
	console.log(loginDetails);
	var username2;
	// console.log("abcdfef ===== %s ", message)
	var userExist = false;
	for (var name in loginDetails) {
		// console.log(loginDetails[name])

		if (String(loginDetails[name].UserName).toLowerCase() == userinput.toLowerCase()){
			session.send('Authentication successful, logged in as  %s', loginDetails[name].UserName);
			userExist = true;
			break;
		}

	}
	if (userExist) {
		session.beginDialog('features');
	} else {
		session.send('%s does not exist in our database. Please sign up to use our wonderful bot %s', userinput, userinput);
		session.endConversation();
		session.beginDialog('Welcome');
	}


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
// }   userinput, session,url,callback

exports.manageAccounts = function getData(session){
	var url = 'https://rarabot.azurewebsites.net/tables/RaraBot';
		rest.Login(session.conversationData["username"], session, url, deleteData);
};

function deleteData(message,session, userinput) {
	    var url = 'https://rarabot.azurewebsites.net/tables/RaraBot';
			var userlist = JSON.parse(message);
			for (var index in userlist) {
				var id = userlist[index].id;
				var username = userlist[index].UserName;
				if (String(username).toLowerCase() === userinput.toLowerCase()) {
					break;
				}
			}
			if (session.conversationData["delType"]==='yes'){
				rest.deleteUserData(url, session, id, userDelete);
			} else {
				session.send("Cancel deletioin..");
				session.endConversation();
			}

};

function userDelete(message,session) {
	session.send("deleted!");
	session.endConversation();
}


exports.retrieveExpenses = function getExpense(session, username , type, price){
    var url = 'https://rarabot.azurewebsites.net/tables/RaraBot';
		if (!session.conversationData["fromGetExpense"]) {
    	rest.getExpense(url, session, username,type,price, checkuserexistence);
		} else {
			session.conversationData["fromGetExpense"] = undefined;
			console.log("we r in retrieveExpenses");
			rest.getExpense(url, session, username,type,"0", readiness);
		}
};

// exports.readExpense = function getExpense(session, username , type){
//     var url = 'https://rarabot.azurewebsites.net/tables/RaraBot';
//     rest.getExpense(url, session, username,type, readiness)
// };


function readiness (message,session,username,type,price){
	console.log("we r in readiness");
	var url = 'https://rarabot.azurewebsites.net/tables/RaraBot';
	var userlist = JSON.parse(message);
	console.log("=========%s ",userlist);
	// console.log()
	var username2;
	var usertype2;
	var userbalance2;
	var exist = false;
	for (var index in userlist){
		 username2 = userlist[index].UserName;
		 usertype2 = userlist[index].ExpenseType;
		 userbalance2 = userlist[index].Balance;
		 console.log ("-12-%s", username2);
		 console.log ("-1121-%s", usertype2);
		if (username.toLowerCase() === String(username2).toLowerCase() && type.toLowerCase() === String(usertype2).toLowerCase()) {
			exist = true
			session.send("UserName: %s   UserType: %s  UserBalance: %s",username2 , usertype2,userbalance2);
			session.endConversation();
		}
		}
		if (!exist){
			session.send("User doesn't exists in the db. Add user first")
			session.endConversation();
		}
	}


function checkuserexistence (message,session,username,type,price){
	var url = 'https://rarabot.azurewebsites.net/tables/RaraBot';
	var userlist = JSON.parse(message);
	console.log("=========%s ",message);
	// console.log()
	var username2;
	var usertype2;
	var exist = false;
	for (var index in userlist){
		 username2 = userlist[index].UserName;
		 usertype2 = userlist[index].ExpenseType;
		 username = String(username).toLowerCase();
		if (username === String(username2).toLowerCase() && type.toLowerCase() === String(usertype2).toLowerCase()) {
			var exist = true;
			price = String(price.substring(1,));
			console.log(price);
			rest.postExpense(url, session, username, type, price, updatefinished);
			break;
		}
		}
		if (!exist) {
			console.log('Null detected');
			session.send("Account does not exist. Register first");
			session.endConversation();
		}

	}


	exports.handleSignUp =function handleSignUp (message, session, username, password, dob){
		session.send("User has been successfully signed in. For security reasons, please log in again.");
		session.beginDialog('Welcome');

	// var userlist = JSON.parse(message);
	// // session.send('Your username is %s', username);
  // //
	// // 	console.log()
	// // 	var username2;
	// // 	var usertype2;
	// 	for (var index in message){
	// 		 username2 = message[index].UserName;
	// 		 password = message[index].Password;

	// 		 usertype2 = message[index].ExpenseType;
	// 		if (username.toLowerCase() === String(username2).toLowerCase() && type.toLowerCase() === String(usertype2).toLowerCase()) {
	// 			session.send("user exists in the db");
	// 			session.endConversation();
	// 		}
	// 		}
	// 		if (username2 === null || username2 === undefined){
	// 			console.log('Null detected')
	// 			rest.postExpense(url, session, username, type, updatefinished)
	// 		}
		}


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
