var express = require('express');
const bodyParser = require('body-parser');

var app = express(); // init api
app.use(bodyParser.json()); // enable json encoding

let database = {}; // create a "database"

app.get('/key', function (req, res) {
    // Get Media if exists
    const token = req.query.token;
    const media = database[token];

    // Check Token media filename
    if (media && media.filename == req.query.name){
        res.status(200).send({ msg: "GOT IT!"})
        delete database[token];
    } else {
        res.status(500).send({ msg: "BAD TOKEN!"})
    }
});

app.post('/key', function (req, res) {
    // Create Token
    const token =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    // Save Token with Filename
    database[token] = { filename: req.body.filename };

    // Return Token
    console.log(database)
    res.send({ token });
});
  

app.listen(3000, function () {
  console.log('Rocking a access token api @ port 3000!');
});
