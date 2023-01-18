const predmetiElement = document.getElementById("lista_predmeta");
const predmeti = PoziviAjax.getPredmeti(callBackPredmeti);

function callBackPredmeti(error, data) {
    if (error == null) {
        predmetiElement.innerHTML += "<ul>";
        data.forEach(element => {
            predmetiElement.innerHTML += "<li>" + " <a href='#'> " + element + "</a>" + "</li>";
        });
        predmetiElement.innerHTML += "</ul>";
    }
}