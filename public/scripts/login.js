let username = document.getElementById("username");
let password = document.getElementById("password");
let dugmeLogin = document.getElementById("dugmeLogin");
let porukaElement = document.getElementById("poruka");


dugmeLogin.addEventListener("click", function(event){
    event.preventDefault();
    PoziviAjax.postLogin(username.value, password.value, ispisi);
});

function ispisi(poruka) {
    porukaElement.innerHTML = poruka;
}