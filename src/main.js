// Este es el punto de entrada de tu aplicacion

import { myFunction } from './lib/index.js';

myFunction();


let toggleBtn= document.querySelector(".toggleBtn");
let navList= document.querySelector(".navList");

toggleBtn.addEventListener("click", ()=>{
    navList.classList.toggle("navVisible")
})

const signInForm= document.querySelector(".formSignIn");
const userEmail= document.getElementById("inputUserEmail");
const userPassword= document.getElementById("inputUserPassword");

signInForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    

    if(userEmail.value==""|| userPassword.value==""){
      
        alert("no debes dejar campos vacios");
    }
    let passwordRegEx= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let emailRegEx= /\S+@\S+\.\S+/;
    if(emailRegEx.test(userEmail.value)== false){
        alert("coloca tu correo completo")
    }
    if(passwordRegEx.test(userPassword.value)==false){
        alert(" Tu contraseña debe tener Mínimo ocho caracteres, al menos una letra mayúscula, una letra minúscula, un número y un carácter especial")
    }

    if(emailRegEx.test(userEmail.value)== true && passwordRegEx.test(userPassword.value)==true){
        alert("inicio de sesión exitoso");
    }
})