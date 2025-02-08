// script.js
function checkPassword() {
    var password = document.getElementById("password").value;
    var correctPassword = "maccleyton@765"; // Substitua pela sua senha
    if (password === correctPassword) {
        document.querySelector(".password-container").style.display = "none"; // Oculta a div do formulário
        document.getElementById("protected-parent").classList.remove("hidden");
        document.getElementById("protected-parent").classList.add("show");
        return false;
    } else {
        alert("Senha incorreta!");
        return false;
    }
}
