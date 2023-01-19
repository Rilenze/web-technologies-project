const listaPredmeta = document.getElementById("listaPredmeta");
const predmeti = PoziviAjax.getPredmeti(callBackPredmeti);

function callBackPredmeti(error, data) {
    if (error == null) {
        data.forEach(element => {
            let li = document.createElement('li');
            let a = document.createElement('a');
            a.setAttribute('id', element);
            let naziv = document.createTextNode(element);

            a.appendChild(naziv);
            a.title = naziv;
            a.href = "#";
            li.appendChild(a);
            listaPredmeta.appendChild(li);

            a.addEventListener('click', function(){
                PoziviAjax.getPredmet(a.id, callbackPredmet);
            });
        });
    }
}

let div = document.getElementById("table");

function callbackPredmet(error, data) {
    if (error == null) {
        TabelaPrisustvo(div, data);
        azurirajPrisustvo(div, data);
    }
    else console.log(error);
}

function azurirajPrisustvo(divTable, prisustva) {

    let table = divTable.firstChild;

    const redovi = table.rows.length;

    const brojPredavanjaSedmicno = prisustva.brojPredavanjaSedmicno;
    const brojVjezbiSedmicno = prisustva.brojVjezbiSedmicno;
    const ukupno = brojPredavanjaSedmicno + brojVjezbiSedmicno;

    let trenutnaSedmica = nadjiTrenutnuSedmicu(table);

    for (let i=1; i<redovi; i++) {
        let miniTable = table.rows[i].cells[trenutnaSedmica+1].firstChild;
        let brojPredavanja = 0;
        let brojVjezbi = 0;

        for (let j=0; j<ukupno; j++) {
            let cell = miniTable.rows[1].cells[j];
            if (j<brojPredavanjaSedmicno) {
                if (cell.style.backgroundColor == "rgb(69, 190, 69)") {
                    brojPredavanja++;
                }
            }
            else {
                if (cell.style.backgroundColor == "rgb(69, 190, 69)") {
                    brojVjezbi++;
                }
            }
        }

        for (let j=0; j<ukupno; j++) {
            let cell = miniTable.rows[1].cells[j];

            cell.addEventListener('click', function(){
                if (cell.style.backgroundColor == "rgb(69, 190, 69)") {
                    if (j<brojPredavanjaSedmicno) brojPredavanja--;
                    else brojVjezbi--;
                }
                else if (cell.style.backgroundColor == "rgb(245, 65, 65)") {
                    if (j<brojPredavanjaSedmicno) brojPredavanja++;
                    else brojVjezbi++;
                }
                else {
                    if (j<brojPredavanjaSedmicno) brojPredavanja++;
                    else brojVjezbi++;
                }
                let indeks = table.rows[i].cells[1].innerHTML;

                const prisustvo = {sedmica : trenutnaSedmica, predavanja : brojPredavanja, vjezbe : brojVjezbi};
                PoziviAjax.postPrisustvo(prisustva.predmet, indeks, prisustvo, callBackPrisutvo);
            });
        }
    }
}

function callBackPrisutvo(error, data) {
    if (error == null) {
        let trenutnaSedmica = nadjiTrenutnuSedmicu(div.firstChild);
        let klasa = TabelaPrisustvo(div, data);
        pomjeriPremaTrenutnoj(klasa, data, trenutnaSedmica);
        azurirajPrisustvo(div, data);
    }
    else {
        console.log("greška");
    }
}

function nadjiTrenutnuSedmicu(table) {
    const kolone = table.rows[1].cells.length;
    let trenutnaSedmica = null;
    for (let i=1; i<kolone; i++) {
        let cell = table.rows[1].cells[i]
        if (cell.firstChild.tagName == "TABLE") {
            trenutnaSedmica = i-1;
            break;
        }
    }
    return trenutnaSedmica;
}

function pomjeriPremaTrenutnoj(klasa, podaci, trenutnaSedmica) {
    let zadnjaSedmica = podaci.prisustva[podaci.prisustva.length - 1].sedmica;
    for (let i=zadnjaSedmica; i<trenutnaSedmica; i++) {
        klasa.sljedecaSedmica();
    }
    for (let i=trenutnaSedmica; i<zadnjaSedmica; i++) {
        klasa.prethodnaSedmica();
    }
}

