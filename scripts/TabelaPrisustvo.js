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







