const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();

app.use(session({
    secret: 'neka tajna sifra',
    resave: true,
    saveUninitialized: true
 }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/html/prijava.html');
});

app.post('/login', function(req, res){
    console.log("fadilje");

    res.json({"poruka" : "Uspješna prijava"});
});

app.listen(3000);