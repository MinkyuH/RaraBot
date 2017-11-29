var request = require('request');
var transaction = require('../transactions');


exports.getExchangeData = function(url, session, callback,total){
	request.get(url, function(err, res, message){
		if (err) {
			console.log(err);
		}else {
			callback(body,session,total)
		}
	})
}

exports.getExpense = function getData(url, session, username,type,price, callback){
    request.get(url, {'headers':{'ZUMO-API-VERSION': '2.0.0'}}, function(err,res,body){
        if(!err && (res.statusCode ===200 || res.statusCode === 201)){
          	callback(body,session,username,type,price);
        }else {
            console.log(err);
        }
    });
};
exports.deleteUserData = function delData(url, session, id, callback){
    var options = {
			url: url + "\\" + id,
			method: 'DELETE',
			headers: {
				'ZUMO-API-VERSION': '2.0.0',
				'Content-Type':'application/json'
			}
		};
		request(options,function(err,res,body) {
			if(!err&&res.statusCode===200){
				console.log(body)
				callback(body,session);
			}else {
				console.log(err);
				console.log(res);
			}
		})
};


exports.Login = function getData(userinput, session,url,callback){
    request.get(url, { 'headers': { 'ZUMO-API-VERSION': '2.0.0' } }, function (err, res, body){
        if(err){
            console.log(err);
        }else {
            callback(body, session, userinput);
        }
    });
};

exports.postSignUp = function getData(url, session, username, password, dob, social, callback){
    var options = {
        url: url,
        method: 'POST',
        headers: {
            'ZUMO-API-VERSION': '2.0.0',
            'Content-Type':'application/json'
        },
        json: {

						"ExpenseType" : social,
            "UserName" : username,
            "Password" : password,
						"Dob" : dob,
						"Balance": "0"
        }
      }
			request(options, function (error, response, body) {
        if (!error && (response.statusCode === 200 || response.statusCode ===201)) {
            console.log(body);
						callback(body, session, username, password, dob)
        }
        else{
            console.log(error);
        }
      });
		};

		exports.postExpense = function getData(url, session, username, type, price, callback){
		    var options = {
		        url: url,
		        method: 'POST',
		        headers: {
		            'ZUMO-API-VERSION': '2.0.0',
		            'Content-Type':'application/json'
		        },
		        json: {
		            "UserName" : username,
		            "ExpenseType" : type,
								"Balance" : price
		        }
		      };
					request(options, function (error, response, body) {
						if (!error && (response.statusCode === 200 || response.statusCode ===201)) {
								console.log(body);
								callback(body,session)
						}
						else{
								console.log(error);
						}
					});
					};




// exports.postExpense = function getData(url, session, username, type, callback){
//     var options = {
//         url: url,
//         method: 'POST',
//         headers: {
//             'ZUMO-API-VERSION': '2.0.0',
//             'Content-Type':'application/json'
//         },
//         json: {
//             "UserName" : username,
//             "ExpenseType" : type
//         }
//       };

//       request(options, function (error, response, body) {
//         if (!error && (response.statusCode === 200 || response.statusCode ===201)) {
//             console.log(body);
// 						callback(body,session)
//         }
//         else{
//             console.log(error);
//         }
//       });
// };
