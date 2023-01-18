let dugmeLogout = document.getElementById("logout");
let listaPredmeta = document.getElementById("lista_predmeta");

dugmeLogout.addEventListener("click", function(){
    PoziviAjax.postLogout(ispisi);
});

function ispisi(poruka) {
    listaPredmeta.innerHTML = poruka;
}