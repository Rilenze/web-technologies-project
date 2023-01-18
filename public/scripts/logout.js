let dugmeLogout = document.getElementById("logout");
let listaPredmeta = document.getElementById("lista_predmeta");

dugmeLogout.addEventListener("click", function(){
    PoziviAjax.postLogout(callBackLogout);
});

function callBackLogout(error, data) {
    if (error == null) {
        window.location.href="http://localhost:3000/prijava.html";
    }
}