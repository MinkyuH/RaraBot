var request = require('request'); //node module for http post requests

exports.retreiveMessage = function (session){

    request.post({
        url: 'https://southcentralus.api.cognitive.microsoft.com/customvision/v1.0/Prediction/a7d51a9d-0b09-4790-8a31-a35683dc184a/url?iterationId=701761b9-005f-4f34-a10e-ee298a599b5d',
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'Prediction-Key': 'f8d835514c6142f8954d8ec306a843be'
        },
        body: { 'Url': session.message.text }
    }, function(error, response, body){
        console.log(validResponse(body));
        session.send(validResponse(body));
    });
}

function validResponse(body){
    if (body && body.Predictions && body.Predictions[0].Tag){
        return "This is " + body.Predictions[0].Tag
    } else{
        console.log('Oops, please try again!');
    }
}
