/* eslint-disable no-console */
import { signInGoogle, signUpUser } from '../lib/auth.js';

import { showModal } from '../functions/modals.js';

export default () => {
  const viewSignUp = `
    <div class='containerImgSignUp'>
      <img src='../src/img/imgClaqueta.png'>
    </div> 
    <div class ='containerUserSignUp'>
        <div class='containerTitleSignIn'>
          <h2>Movie Talk</h2>
          <h2>Sign Up</h2>
        </div>
        <div class='containerUserData'>
          <form class='signUpForm'>
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
    e.preventDefault();
    // eslint-disable-next-line no-undef
    const userEmail = sectionView.querySelector('#inputUserEmail').value;
    const userPassword = sectionView.querySelector('#inputUserPassword').value;
    // eslint-disable-next-line no-undef
    const checkBox = sectionView.querySelector('.checkBoxTerms');
    if (userEmail === '' && userPassword === '') {
      e.preventDefault();
      showModal("You can't leave fields blank");
    } else if (!checkBox.checked) {
      e.preventDefault();
      showModal('You must agree to Terms & Conditions');
    }

    signUpUser(userEmail, userPassword).then((userCredential) => {
    // Signed in
      const user = userCredential.user;
      showModal('User created, you can know Sign In');
      window.location.hash = '#/';
      console.log(user);

    // ...
    })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        // showModal(errorMessage);
        console.log(errorCode);
        if (errorCode === 'auth/email-already-in-use') {
          showModal('Email already in use');
        } else if (errorCode === 'auth/weak-password') {
          showModal('Password should be at least 6 characters');
        }
      });
  });
  const googleAuth = sectionView.querySelector('.btnSocialNetworks');
  googleAuth.addEventListener('click', (e) => {
    e.preventDefault();
    signInGoogle().then(() => {
      window.location.hash = '#/timeline';
    // ...
    }).catch((error) => {
    // Handle Errors here.
      const errorCode = error.code;
      console.log(errorCode);
      // const errorMessage = error.message;
      // showModal(errorMessage);
      // The email of the user's account used.
      const email = error.email;
      showModal(email);
    // ...
    });
  });
  return sectionView;
};
