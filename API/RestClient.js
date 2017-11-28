var request = require('request');
var transaction = require('../transactions');

exports.getExpense = function getData(url, session, username,type, callback){
    request.get(url, {'headers':{'ZUMO-API-VERSION': '2.0.0'}}, function(err,res,body){
        if(!err && (res.statusCode ===200 || res.statusCode === 201)){
          	callback(body,session,username,type);
        }else {
            console.log(err);
        }
    });
};


exports.postExpense = function getData(url, session, username, type, callback){
    var options = {
        url: url,
        method: 'POST',
        headers: {
            'ZUMO-API-VERSION': '2.0.0',
            'Content-Type':'application/json'
        },
        json: {
            "UserName" : username,
            "ExpenseType" : type
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
