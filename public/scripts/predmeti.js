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
    }
    else console.log(error);
}

