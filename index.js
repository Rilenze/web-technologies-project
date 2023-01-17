const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const fs = require("fs");

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

app.post('/login', async function(req, res){

    fs.readFile('public/data/nastavnici.json', async function(err, data){
        let nastavnici = JSON.parse(data);
        const nastavnik = nastavnici.find(n => n.nastavnik.username == req.body.username);

        if (!nastavnik) {
            res.json({"poruka" : "Neuspješna prijava"});
        }
        else if (nastavnik) {
            const isValid = await bcrypt.compare(req.body.password, nastavnik.nastavnik.password_hash);
            if (isValid) {
                res.json({"poruka" : "Uspješna prijava"});
            }
        }
    });

});

app.listen(3000);