let TabelaPrisustvo = function(divRef, podaci) {
    let naslovi = ['Ime i prezime', 'Index', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII-XV'];
    
    let table = document.createElement('table');
    let headerRow = document.createElement('tr');

    naslovi.forEach(tekst => {
        let header = document.createElement('th');
        let textHeader = document.createTextNode(tekst);
        header.appendChild(textHeader);
        headerRow.appendChild(header);
    });

    table.appendChild(headerRow);

    let brojPredavanjaSedmicno = podaci.brojPredavanjaSedmicno;
    let brojVjezbiSedmicno = podaci.brojVjezbiSedmicno;

    for (let i=0; i<podaci.studenti.length; i++) {
        // ime i indeks
        let row = document.createElement('tr');
        let cellIme = document.createElement('td');
        let ime = document.createTextNode(podaci.studenti[i].ime);
        cellIme.appendChild(ime);
        let cellIndeks = document.createElement('td');
        let indeks = document.createTextNode(podaci.studenti[i].index);
        cellIndeks.appendChild(indeks);
        row.appendChild(cellIme);
        row.appendChild(cellIndeks);

        //sedmice
        for (let j=1; j<9; j++) {
            let imaPrisustvo = false;
            podaci.prisustva.forEach(prisustvo => {
                if (prisustvo.sedmica == j && prisustvo.index == podaci.studenti[i].index) {
                    let cellPrisustvo = document.createElement('td');
                    let procenat = 100 * (prisustvo.predavanja + prisustvo.vjezbe) / (brojPredavanjaSedmicno + brojVjezbiSedmicno);
                    procenat += '%';
                    let polje = document.createTextNode(procenat);
                    cellPrisustvo.appendChild(polje);
                    row.appendChild(cellPrisustvo);
                    imaPrisustvo = true;
                }
            });
            if (!imaPrisustvo) {
                let cellPrisustvo = document.createElement('td');
                row.appendChild(cellPrisustvo);
            }

        }



        table.appendChild(row);
    } 
    

    
    
    
    
    
    divRef.appendChild(table); 

    /*
    //privatni atributi modula

    //implementacija metoda
    let sljedecaSedmica = function() {

    }
    
    let prethodnaSedmica = function() {

    }

    return {
        sljedecaSedmica: sljedecaSedmica,
        prethodnaSedmica: prethodnaSedmica
    }*/
};







