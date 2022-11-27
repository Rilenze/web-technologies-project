

let div = document.getElementById("table");

//instanciranje
/*let prisustvo = TabelaPrisustvo(div, {studenti: [{ime:"Neko",index:12345}],
prisustva:[{sedmica:1,predavanja:1,vjezbe:1,index:12345}], predmet:"WT",
brojPredavanjaSedmicno:3, brojVjezbiSedmicno:2});*/

//pozivanje metoda
//prisustvo.sljedecaSedmica();
//prisustvo.prethodnaSedmica();


let prisustvo = TabelaPrisustvo(div, {
    "studenti": [{
        "ime": "Rijad Burović",
        "index": 18714
        },
        {
        "ime": "Safet Isović",
        "index": 14352
        },
        {
        "ime": "Šaban Saulić",
        "index": 15354
        }
    ],
    "prisustva": [{
        "sedmica": 1,
        "predavanja": 3,
        "vjezbe": 2,
        "index": 18714
        },
        {
        "sedmica": 1,
        "predavanja": 2,
        "vjezbe": 2,
        "index": 14352
        },
        {
        "sedmica": 1,
        "predavanja": 1,
        "vjezbe": 1,
        "index": 15354
        },
        {
        "sedmica": 2,
        "predavanja": 2,
        "vjezbe": 2,
        "index": 18714
        },
        {
        "sedmica": 2,
        "predavanja": 2,
        "vjezbe": 1,
        "index": 15354
        },
        {
        "sedmica": 3,
        "predavanja": 2,
        "vjezbe": 1,
        "index": 18714
        },
        {
        "sedmica": 3,
        "predavanja": 3,
        "vjezbe": 2,
        "index": 15354
        },
        {
        "sedmica": 4,
        "predavanja": 2,
        "vjezbe": 1,
        "index": 18714
        },
        {
        "sedmica": 4,
        "predavanja": 3,
        "vjezbe": 2,
        "index": 14352
        },
        {
        "sedmica": 5,
        "predavanja": 1,
        "vjezbe": 2,
        "index": 18714
        },
        {
        "sedmica": 6,
        "predavanja": 0,
        "vjezbe": 2,
        "index": 18714
        },
        {
        "sedmica": 7,
        "predavanja": 3,
        "vjezbe": 1,
        "index": 18714
        },
],
    "predmet": "Razvoj programskih rješenja",
    "brojPredavanjaSedmicno": 3,
    "brojVjezbiSedmicno": 2
    }
);