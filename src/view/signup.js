/* eslint-disable max-len */
/* eslint-disable no-console */
import { signInGoogle, signUpUser, verificationEmail } from '../Firebase/auth.js';

import { createUserColl, getUserInfoProfile } from '../Firebase/firestore.js';

import { showModal } from '../functions/modals.js';

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
    e.preventDefault();

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
          // Signed in
          const user = userCredential.user;
          // const name = user.displayName || 'New Movielover';
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
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === 'auth/email-already-in-use') {
            showModal('Email already in use');
          } else if (errorCode === 'auth/weak-password') {
            showModal('Password should be at least 6 characters');
          }
        });
    }
  });

  const googleAuth = sectionView.querySelector('.btnSocialNetworks');
  googleAuth.addEventListener('click', (e) => {
    e.preventDefault();
    signInGoogle().then((result) => {
      const user = result.user;
      const name = user.displayName || 'New Movielover';
      const nickname = 'Movielover';
      const email = user.email;
      const photo = user.photoURL ? user.photoURL : './img/profileDefault.png';
      const aboutMe = "I'm a movielover";
      const movie = 'My favorite movies is ...';
      const city = 'I live in ...';
      const interests = 'I like ...';
      const uid = user.uid;
      getUserInfoProfile(uid).then((docSnap) => {
        if (docSnap.exists()) {
          window.location.hash = '#/timeline';
          console.log('existes, puedes volver a entrar y no debes crear una nueva colección');
        } else {
          createUserColl(uid, name, nickname, email, photo, aboutMe, movie, city, interests);
          window.location.hash = '#/timeline';
          console.log('nuevo usuario, chequea si se creo la nueva colección');
        }
      }).catch((err) => console.log(err));
    }).catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
    });
  });
  return sectionView;
};
