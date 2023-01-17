let username = document.getElementById("username");
let password = document.getElementById("password");
let dugmeLogin = document.getElementById("dugmeLogin");
let porukaElement = document.getElementById("poruka");



dugmeLogin.addEventListener("click", function(event){
    event.preventDefault();
    console.log("majmunee");
    PoziviAjax.postLogin(username, password, ispisi);
});

function ispisi(poruka) {
    porukaElement.innerHTML = poruka;
}