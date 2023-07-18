let TabelaPrisustvo = function (divRef, podaci) {
  divRef.innerHTML = "";

  let trenutnaSedmica = podaci.prisustva[podaci.prisustva.length - 1].sedmica;
  let brojPredavanjaSedmicno = podaci.brojPredavanjaSedmicno;
  let brojVjezbiSedmicno = podaci.brojVjezbiSedmicno;

  let setSedmica = new Set();

  // Testiranje ispravnosti podataka
  let ispravnost = true;
  podaci.prisustva.forEach((prisustvo) => {
    setSedmica.add(prisustvo.sedmica);

    let postojiStudent = false;
    podaci.studenti.forEach((student) => {
      if (prisustvo.index == student.index) {
        postojiStudent = true;
      }
    });
    if (!postojiStudent) {
      ispravnost = false;
      return;
    }

    if (
      prisustvo.predavanja > brojPredavanjaSedmicno ||
      prisustvo.vjezbe > brojVjezbiSedmicno ||
      prisustvo.predavanja < 0 ||
      prisustvo.vjezbe < 0
    ) {
      ispravnost = false;
      return;
    }
    podaci.prisustva.forEach((prisustvo2) => {
      if (prisustvo != prisustvo2) {
        if (
          prisustvo.sedmica == prisustvo2.sedmica &&
          prisustvo.index == prisustvo2.index
        )
          ispravnost = false;
        return;
      }
    });
  });

  podaci.studenti.forEach((student) => {
    podaci.studenti.forEach((student2) => {
      if (student != student2) {
        if (student.index == student2.index) {
          ispravnost = false;
          return;
        }
      }
    });
  });

  let sedmice = Array.from(setSedmica).sort();

  for (let i = 1; i < sedmice.length; i++) {
    if (sedmice[i] != sedmice[i - 1] + 1) {
      ispravnost = false;
      break;
    }
  }

  if (!ispravnost) {
    divRef.innerText = "Podaci o prisustvu nisu validni!";
    return;
  }

  let nazivPredmeta = document.getElementById("nazivPredmeta");
  nazivPredmeta.innerText = podaci.predmet;

  // Pravljenje tabele

  let maksimalnaSedmica = sedmice[sedmice.length - 1];

  let naslovi = new Map([
    [1, "I"],
    [2, "II"],
    [3, "III"],
    [4, "IV"],
    [5, "V"],
    [6, "VI"],
    [7, "VII"],
    [8, "VIII"],
    [9, "IX"],
    [10, "X"],
    [11, "XI"],
    [12, "XII"],
    [13, "XIII"],
    [14, "XIV"],
    [15, "XV"],
  ]);

  // naslovi tabele

  let table = document.createElement("table");
  let headerRow = document.createElement("tr");

  let header1 = document.createElement("th");
  let textHeader1 = document.createTextNode("Ime i prezime");
  header1.style = "width: 15%;";
  header1.appendChild(textHeader1);
  headerRow.appendChild(header1);

  let header2 = document.createElement("th");
  let textHeader2 = document.createTextNode("Index");
  header2.style = "width: 10%;";
  header2.appendChild(textHeader2);
  headerRow.appendChild(header2);

  for (let i = 1; i <= maksimalnaSedmica; i++) {
    let header = document.createElement("th");
    let textHeader = document.createTextNode(naslovi.get(i));
    header.appendChild(textHeader);
    headerRow.appendChild(header);
  }

  let header3 = document.createElement("th");
  let textHeader3 = document.createTextNode(
    naslovi.get(maksimalnaSedmica + 1) + "-XV"
  );
  header3.appendChild(textHeader3);
  headerRow.appendChild(header3);

  table.appendChild(headerRow);

  //elementi tabele

  for (let i = 0; i < podaci.studenti.length; i++) {
    // ime i indeks
    let row = document.createElement("tr");
    let cellIme = document.createElement("td");
    let ime = document.createTextNode(podaci.studenti[i].ime);
    cellIme.appendChild(ime);
    let cellIndeks = document.createElement("td");
    let indeks = document.createTextNode(podaci.studenti[i].index);
    cellIndeks.appendChild(indeks);
    row.appendChild(cellIme);
    row.appendChild(cellIndeks);

    //sedmice
    for (let j = 1; j <= maksimalnaSedmica; j++) {
      if (j == trenutnaSedmica) {
        let cellMiniTabela = document.createElement("td");
        let miniTabela = document.createElement("table");
        miniTabela.style = "table-layout: fixed;";

        // Vjezbe i predavanja
        let miniRow = document.createElement("tr");

        for (let k = 1; k <= brojPredavanjaSedmicno; k++) {
          let cellP = document.createElement("td");
          cellP.className = "trenutnoPolje";
          let tekstP = "P" + k;
          let polje = document.createTextNode(tekstP);
          cellP.appendChild(polje);
          miniRow.appendChild(cellP);
        }

        for (let k = 1; k <= brojVjezbiSedmicno; k++) {
          let cellV = document.createElement("td");
          cellV.className = "trenutnoPolje";
          let tekstV = "V" + k;
          let polje = document.createTextNode(tekstV);
          cellV.appendChild(polje);
          miniRow.appendChild(cellV);
        }
        miniTabela.appendChild(miniRow);

        // kockice
        let prisustvaStudenta = null;
        podaci.prisustva.forEach((prisustvo) => {
          if (
            prisustvo.index == podaci.studenti[i].index &&
            prisustvo.sedmica == trenutnaSedmica
          ) {
            prisustvaStudenta = prisustvo;
          }
        });

        let miniRow2 = document.createElement("tr");
        for (let k = 1; k <= brojPredavanjaSedmicno; k++) {
          let cell = document.createElement("td");

          if (prisustvaStudenta != null) {
            if (k <= prisustvaStudenta.predavanja)
              cell.style.backgroundColor = "rgb(69, 190, 69)";
            else if (k > prisustvaStudenta.predavanja)
              cell.style.backgroundColor = "rgb(245, 65, 65)";
          }
          miniRow2.appendChild(cell);
        }
        for (let k = 1; k <= brojVjezbiSedmicno; k++) {
          let cell = document.createElement("td");

          if (prisustvaStudenta != null) {
            if (k <= prisustvaStudenta.vjezbe)
              cell.style.backgroundColor = "rgb(69, 190, 69)";
            else if (k > prisustvaStudenta.vjezbe)
              cell.style.backgroundColor = "rgb(245, 65, 65)";
          }

          miniRow2.appendChild(cell);
        }
        miniTabela.appendChild(miniRow2);

        cellMiniTabela.appendChild(miniTabela);
        cellMiniTabela.style = "width: 12%;";
        row.appendChild(cellMiniTabela);

        continue;
      }

      let imaPrisustvo = false;
      podaci.prisustva.forEach((prisustvo) => {
        if (
          prisustvo.sedmica == j &&
          prisustvo.index == podaci.studenti[i].index
        ) {
          let cellPrisustvo = document.createElement("td");
          let procenat =
            (100 * (prisustvo.predavanja + prisustvo.vjezbe)) /
            (brojPredavanjaSedmicno + brojVjezbiSedmicno);
          procenat += "%";
          let polje = document.createTextNode(procenat);
          cellPrisustvo.style = "width: 5%;";
          cellPrisustvo.appendChild(polje);
          row.appendChild(cellPrisustvo);
          imaPrisustvo = true;
        }
      });
      if (!imaPrisustvo) {
        let cellPrisustvo = document.createElement("td");
        row.appendChild(cellPrisustvo);
      }
    }

    let cellPrisustvo = document.createElement("td");
    row.appendChild(cellPrisustvo);

    table.appendChild(row);
  }

  divRef.appendChild(table);

  //DRUGI ZADATAK
  let arrowsContainer = document.createElement("div");
  arrowsContainer.setAttribute("id", "arrowsContainer");

  let btnLijevo = document.createElement("button");
  let btnDesno = document.createElement("button");
  btnLijevo.innerHTML = '<i class="fa-solid fa-arrow-left fa-2xl"></i>';
  btnDesno.innerHTML = '<i class="fa-solid fa-arrow-right fa-2xl"></i>';

  btnLijevo.className = "Arrow";
  btnDesno.className = "Arrow";

  arrowsContainer.appendChild(btnLijevo);
  arrowsContainer.appendChild(btnDesno);

  divRef.appendChild(arrowsContainer);

  //privatni atributi modula

  //implementacija metoda
  let sljedecaSedmica = function () {
    if (trenutnaSedmica == maksimalnaSedmica) return;
    trenutnaSedmica += 1;

    for (let i = 1; i < table.rows.length; i++) {
      let cell = table.rows[i].cells[trenutnaSedmica];
      cell.style = "width: 5%;";
      let cellSljedeca = table.rows[i].cells[trenutnaSedmica + 1];
      cellSljedeca.style = "width: 12%;";

      cell.innerHTML = "";
      cellSljedeca.innerHTML = "";

      let miniTabela = document.createElement("table");
      miniTabela.style = "table-layout: fixed;";

      // Vjezbe i predavanja
      let miniRow = document.createElement("tr");

      for (let k = 1; k <= brojPredavanjaSedmicno; k++) {
        let cellP = document.createElement("td");
        cellP.className = "trenutnoPolje";
        let tekstP = "P" + k;
        let polje = document.createTextNode(tekstP);
        cellP.appendChild(polje);
        miniRow.appendChild(cellP);
      }

      for (let k = 1; k <= brojVjezbiSedmicno; k++) {
        let cellV = document.createElement("td");
        cellV.className = "trenutnoPolje";
        let tekstV = "V" + k;
        let polje = document.createTextNode(tekstV);
        cellV.appendChild(polje);
        miniRow.appendChild(cellV);
      }
      miniTabela.appendChild(miniRow);

      let prisustvaStudenta = null;

      podaci.prisustva.forEach((prisustvo) => {
        if (
          prisustvo.sedmica == trenutnaSedmica - 1 &&
          prisustvo.index.toString() == table.rows[i].cells[1].innerText
        ) {
          let procenat =
            (100 * (prisustvo.predavanja + prisustvo.vjezbe)) /
            (brojPredavanjaSedmicno + brojVjezbiSedmicno);
          procenat += "%";
          cell.innerHTML = procenat;
          //cell.style = "width: 5%;";
        }
        // nalazenje studenta za sljedece prisustvo
        if (
          prisustvo.index.toString() == table.rows[i].cells[1].innerText &&
          prisustvo.sedmica == trenutnaSedmica
        ) {
          prisustvaStudenta = prisustvo;
        }
      });

      // KOCKICE

      let miniRow2 = document.createElement("tr");
      for (let k = 1; k <= brojPredavanjaSedmicno; k++) {
        let cellKocka = document.createElement("td");

        if (prisustvaStudenta != null) {
          if (k <= prisustvaStudenta.predavanja)
            cellKocka.style.backgroundColor = "rgb(69, 190, 69)";
          else if (k > prisustvaStudenta.predavanja)
            cellKocka.style.backgroundColor = "rgb(245, 65, 65)";
        }

        miniRow2.appendChild(cellKocka);
      }
      for (let k = 1; k <= brojVjezbiSedmicno; k++) {
        let cellKocka = document.createElement("td");

        if (prisustvaStudenta != null) {
          if (k <= prisustvaStudenta.vjezbe)
            cellKocka.style.backgroundColor = "rgb(69, 190, 69)";
          else if (k > prisustvaStudenta.vjezbe)
            cellKocka.style.backgroundColor = "rgb(245, 65, 65)";
        }

        miniRow2.appendChild(cellKocka);
      }
      miniTabela.appendChild(miniRow2);

      cellSljedeca.appendChild(miniTabela);
      //cellSljedeca.style = "width: 12%;";
    }
    azurirajPrisustvo(divRef, podaci);
  };

  let prethodnaSedmica = function () {
    if (trenutnaSedmica == 1) return;
    trenutnaSedmica -= 1;

    for (let i = 1; i < table.rows.length; i++) {
      let cell = table.rows[i].cells[trenutnaSedmica + 2];
      cell.style = "width: 5%;";
      let cellSljedeca = table.rows[i].cells[trenutnaSedmica + 1];
      cellSljedeca.style = "width: 12%;";

      cell.innerHTML = "";
      cellSljedeca.innerHTML = "";

      let miniTabela = document.createElement("table");
      miniTabela.style = "table-layout: fixed;";

      // Vjezbe i predavanja
      let miniRow = document.createElement("tr");

      for (let k = 1; k <= brojPredavanjaSedmicno; k++) {
        let cellP = document.createElement("td");
        cellP.className = "trenutnoPolje";
        let tekstP = "P" + k;
        let polje = document.createTextNode(tekstP);
        cellP.appendChild(polje);
        miniRow.appendChild(cellP);
      }

      for (let k = 1; k <= brojVjezbiSedmicno; k++) {
        let cellV = document.createElement("td");
        cellV.className = "trenutnoPolje";
        let tekstV = "V" + k;
        let polje = document.createTextNode(tekstV);
        cellV.appendChild(polje);
        miniRow.appendChild(cellV);
      }
      miniTabela.appendChild(miniRow);

      let prisustvaStudenta = null;

      podaci.prisustva.forEach((prisustvo) => {
        if (
          prisustvo.sedmica == trenutnaSedmica + 1 &&
          prisustvo.index.toString() == table.rows[i].cells[1].innerText
        ) {
          let procenat =
            (100 * (prisustvo.predavanja + prisustvo.vjezbe)) /
            (brojPredavanjaSedmicno + brojVjezbiSedmicno);
          procenat += "%";
          cell.innerHTML = procenat;
        }
        // nalazenje studenta za sljedece prisustvo
        if (
          prisustvo.index.toString() == table.rows[i].cells[1].innerText &&
          prisustvo.sedmica == trenutnaSedmica
        ) {
          prisustvaStudenta = prisustvo;
        }
      });

      // KOCKICE

      let miniRow2 = document.createElement("tr");
      for (let k = 1; k <= brojPredavanjaSedmicno; k++) {
        let cellKocka = document.createElement("td");

        if (prisustvaStudenta != null) {
          if (k <= prisustvaStudenta.predavanja)
            cellKocka.style.backgroundColor = "rgb(69, 190, 69)";
          else if (k > prisustvaStudenta.predavanja)
            cellKocka.style.backgroundColor = "rgb(245, 65, 65)";
        }

        miniRow2.appendChild(cellKocka);
      }
      for (let k = 1; k <= brojVjezbiSedmicno; k++) {
        let cellKocka = document.createElement("td");

        if (prisustvaStudenta != null) {
          if (k <= prisustvaStudenta.vjezbe)
            cellKocka.style.backgroundColor = "rgb(69, 190, 69)";
          else if (k > prisustvaStudenta.vjezbe)
            cellKocka.style.backgroundColor = "rgb(245, 65, 65)";
        }

        miniRow2.appendChild(cellKocka);
      }
      miniTabela.appendChild(miniRow2);

      cellSljedeca.appendChild(miniTabela);
    }
    azurirajPrisustvo(divRef, podaci);
  };

  btnLijevo.onclick = prethodnaSedmica;
  btnDesno.onclick = sljedecaSedmica;
  return {
    sljedecaSedmica: sljedecaSedmica,
    prethodnaSedmica: prethodnaSedmica,
  };
};
