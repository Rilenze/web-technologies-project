let username = document.getElementById("username");
let password = document.getElementById("password");
let dugmeLogin = document.getElementById("dugmeLogin");
let porukaElement = document.getElementById("poruka");


dugmeLogin.addEventListener("click", function(event){
    event.preventDefault();
    PoziviAjax.postLogin(username.value, password.value, callBackLogin);
});

function callBackLogin(error, data) {
    if(error == null && data == "Uspješna prijava") { 
        window.location.href="http://localhost:3000/predmeti.html";
    }
    else { 
        porukaElement.innerHTML = data;
    }
}