var express = require('express');
const bodyParser = require('body-parser');
var url = require('url');

var app = express(); // init api
app.use(bodyParser.json()); // enable json encoding

let database = {}; // create a "database"

app.get('/key', function (req, res) {
    var url_parts = url.parse(req.headers['x-original-uri'], true);
    var query = url_parts.query;
    console.log(query)
    // Get Media if exists
    const token = query.token;
    const media = database[token];

    // Check Token media filename
    if (media){
        console.log("GO GO GO")
        res.status(200).send({ msg: "GOT IT!"})
    } else {
        console.log("STAAAHP")
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
  
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(3000, function () {
  console.log('Rocking a access token api @ port 3000!');
});
