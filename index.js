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
app.use(express.static(__dirname + '/public/html'));

/*app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/html/prijava.html');
});*/

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/html/prijava.html');
});

app.get('/predmeti', function(req, res){
    if (req.session.username == null) {
        res.json({"greska" : "Nastavnik nije loginovan"});
        return;
    }
    res.json({predmeti : req.session.predmeti});
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
                req.session.username = nastavnik.nastavnik.username;
                req.session.predmeti = nastavnik.predmeti;
                res.json({"poruka" : "Uspješna prijava"});
            }
            else if (!isValid) res.json({"poruka" : "Neuspješna prijava"});
        }
    });

});

app.post('/logout', function(req, res){
    req.session.username = null;
    req.session.predmeti = null;
    res.end();
});

app.get('/predmet/:NAZIV', function(req, res){
    fs.readFile("public/data/prisustva.json", function(err, data){
        const prisustva = JSON.parse(data);

        const prisustvaZaPredmet = prisustva.find(p => p.predmet == req.params.NAZIV);

        if(prisustvaZaPredmet) res.json(prisustvaZaPredmet);
        else res.status(404).send("Greška! Ne postoji predmet u bazi!");
    });
});

app.post('/prisustvo/predmet/:NAZIV/student/:index', function(req, res){
    const sedmica = req.body['sedmica'];
    const predavanja = req.body['predavanja'];
    const vjezbe = req.body['vjezbe'];

    fs.readFile('public/data/prisustva.json', function(err, data){
        let prisustvaPredmeta = JSON.parse(data);


        for (let i=0; i<prisustvaPredmeta.length; i++) {
            if (prisustvaPredmeta[i].predmet == req.params.NAZIV) {
                let nadjen = false;
                for (let j=0; j<prisustvaPredmeta[i].prisustva.length; j++) {
                    let element = prisustvaPredmeta[i].prisustva[j];
                    if (element.index == req.params.index && element.sedmica == sedmica) {
                        prisustvaPredmeta[i].prisustva[j].predavanja = predavanja;
                        prisustvaPredmeta[i].prisustva[j].vjezbe = vjezbe;
                        nadjen = true;
                        break;
                    }
                }
                if (!nadjen) {
                    const novoPrisustvo = {
                        "sedmica" : sedmica,
                        "predavanja" : predavanja,
                        "vjezbe" : vjezbe,
                        "index" : req.params.index
                    }
                    prisustvaPredmeta[i].prisustva.push(novoPrisustvo);
                }
            }
        }

        

        fs.writeFile('public/data/prisustva.json', JSON.stringify(prisustvaPredmeta), function(err){
            if (err) console.log(err);
            console.log("Spašeno");
        }); 
    
        const predmet = prisustvaPredmeta.find(pr => pr.predmet == req.params.NAZIV);
        res.json(predmet); 
    });

    
});



app.listen(3000);