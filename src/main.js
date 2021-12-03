// Este es el punto de entrada de tu aplicacion

import { myFunction } from './lib/index.js';

myFunction();


let toggleBtn= document.querySelector(".toggleBtn");
let navList= document.querySelector(".navList");

toggleBtn.addEventListener("click", ()=>{
    navList.classList.toggle("navVisible")
})