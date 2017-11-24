const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');

const PORT = process.env.PORT || 3000;
const app = express();

//routing
app.get('/bot', function(req,res){
	res.send('ChatBot');
})

//server init
app.listen(PORT);
console.log("Running on port " , PORT)
