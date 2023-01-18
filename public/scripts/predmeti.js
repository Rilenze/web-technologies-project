const predmetiElement = document.getElementById("lista_predmeta");
const predmeti = PoziviAjax.getPredmeti(callBackPredmeti);

function callBackPredmeti(error, data) {
    if (error == null) {
        data.forEach(element => {
            predmetiElement.innerHTML += element + ",";
        });
    }
}