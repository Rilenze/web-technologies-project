const modulAjax = pozivAjax();

let username = document.getElementById("username");
let password = document.getElementById("password");
let dugmeLogin = document.getElementById("dugmeLogin");
let porukaElement = document.getElementById("poruka");

dugmeLogin.addEventListener("click", function(){
    modulAjax.impl_postLogin(username, password, ispisi);
});

function ispisi(poruka) {
    porukaElement.innerHTML = poruka;
}