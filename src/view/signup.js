/* eslint-disable max-len */
/* eslint-disable no-console */
import { signUpUser, verificationEmail, signInGoogle } from '../Firebase/auth.js';

import { showModal } from '../functions/modals.js';

import {
  errorHandler,
} from '../functions/formFunctions.js';

import { createUserColl, checkIfUserExists } from '../Firebase/firestore.js';

export default () => {
  const viewSignUp = `
    <div class='containerImgSignUp'>
      <img src="./img/imgClaqueta.png">
    </div> 
    <div class ='containerUserSignUp'>
        <div class='containerTitleSignIn'>
          <h2>Movie Talk</h2>
          <h2>Sign Up</h2>
        </div>
        <div class='containerUserData'>
          <form class='signUpForm'>
          <input type='text' placeholder='Your name' class='inputUserData' id='inputUserName'/>
          <input type='email' placeholder='Email' class='inputUserData' id='inputUserEmail'/>
          <input type='password' placeholder='Password' class='inputUserData' id='inputUserPassword'/>
              <div class='termsConditions'>
              <input type='checkbox' class='checkBoxTerms'>
              <a class = 'showTerms'>Agree to Terms & Conditions</a>
              </div>
              <div class='containerBtn'>
                  <button class='btn'>
                      <a>Sign Up</a>
                  </button>
              </div>
          </form>
        </div>
        <div class='separation'>
          <div class='firstLine'></div> 
          <div class='circle'> </div> 
          <div class='secondLine'> </div> 
        </div>
        <div class='containerBtnSocialNetworks'>
          <button class='btnSocialNetworks'>
            <i class='fab fa-google-plus-g'></i>Login with Google
          </button>
        </div>     
    </div> 
   `;
  const sectionView = document.createElement('section');
  sectionView.classList.add('containerSignUp');
  sectionView.innerHTML = viewSignUp;

  const signUpForm = sectionView.querySelector('.signUpForm');
  const showTerms = sectionView.querySelector('.showTerms');

  showTerms.addEventListener('click', (e) => {
    e.preventDefault();
    showModal(`<strong>TÉRMINOS Y CONDICIONES<br> <br> </strong>
    No somos propietarios de ningún dato, información o material que envíe a MovieTalk. Usted será el único responsable de la exactitud, calidad, adecuación y derecho de uso de todo el Contenido enviado.
    Al aceptar reconoce haber leído el presente Acuerdo y acepta todos sus términos y condiciones. Si no está de acuerdo en cumplir los términos de este Acuerdo, no debe aceptarlo.
    `);
  });

  signUpForm.addEventListener('submit', (e) => {
    // checkingInputs(userEmail, userPassword, e, inputUserName, checkBox);
    // console.log(inputUserName.value);
    const userEmail = sectionView.querySelector('#inputUserEmail').value;
    const userPassword = sectionView.querySelector('#inputUserPassword').value;
    const inputUserName = sectionView.querySelector('#inputUserName').value;

    const checkBox = sectionView.querySelector('.checkBoxTerms');
    if (userEmail.trim() === '' || userPassword.trim() === '' || inputUserName.trim() === '') {
      e.preventDefault();
      showModal("You can't leave blank fields");
    } else if (!checkBox.checked) {
      e.preventDefault();
      showModal('You must agree to Terms & Conditions');
    } else {
      signUpUser(userEmail, userPassword)
        .then((userCredential) => {
          const user = userCredential.user;
          const nickname = 'Movielover';
          const email = user.email;
          const photo = user.photoURL ? user.photoURL : './img/profileDefault.png';
          const aboutMe = "I'm a movielover";
          const movie = 'My favorite movies is ...';
          const city = 'I live in ...';
          const interests = 'I like ...';
          const uid = user.uid;
          createUserColl(uid, inputUserName, nickname, email, photo, aboutMe, movie, city, interests);
          verificationEmail(userEmail);
          showModal('A verification email was sent, check your inbox');
          signUpForm.reset();
          window.location.hash = '#/';
        })
        .catch((error) => errorHandler(error));
    }
  });

  const googleAuth = sectionView.querySelector('.btnSocialNetworks');
  googleAuth.addEventListener('click', (e) => {
    signInGoogle(e, checkIfUserExists);
  });
  return sectionView;
};
