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

const showModal=(message)=>{
    let modalBox=document.getElementById("modal");
    modalBox.style.display="block";
    modalBox.innerHTML= `
    <div class="modalContent">
    <p class="modalText">${message}</p>
    <button class="closeModalBtn">Entendido</button>
    </div>`
 
 let modalClose=document.querySelector(".closeModalBtn");
    modalClose.addEventListener("click", ()=>{
    modalBox.style.display="none"
 })

 window.addEventListener("click", (e)=>{
    if(e.target==modalBox){
    modalBox.style.display="none"
 }
 })

}

signInForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    
 let passwordRegEx= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
 let emailRegEx= /\S+@\S+\.\S+/;

 if(userEmail.value==""|| userPassword.value==""){
    e.preventDefault();
    showModal("No puedes dejar espacios en blanco");
 }

 else if(emailRegEx.test(userEmail.value)== false){
    e.preventDefault();
    showModal("Coloca tu correo completo");
 }

 else if(passwordRegEx.test(userPassword.value)==false){
    e.preventDefault();
    showModal("Tu contraseña debe tener mínimo ocho caracteres, al menos una letra mayúscula, una letra minúscula, un número y un carácter especial")
 }

 else if(emailRegEx.test(userEmail.value)== true && passwordRegEx.test(userPassword.value)==true){
    e.preventDefault();
    showModal("Inicio de sesión exitoso");
    signInForm.reset();
 }
})