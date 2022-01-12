/* eslint-disable max-len */
/* eslint-disable no-console */
import {
  checkingUser,
  errorHandler,
} from '../functions/formFunctions.js';

import {
  showModal,
} from '../functions/modals.js';

import { signInUser, signInGoogle } from '../Firebase/auth.js';

import { checkIfUserExists } from '../Firebase/firestore.js';

export default () => {
  const viewSignIn = `      
    <div class="containerImgSignIn">
      <img src="./img/imgClaqueta.png">
    </div> 
    <div class ="containerUserSignIn">
      <div class="containerTitleSignIn">
          <h2>MOVIE TALK</h2> 
      </div>
      <div class="containerUserData">
        <form action="" class="formSignIn">
            <input type="email" placeholder="Email" class="inputUserData" id="inputUserEmail"/>
            <input type="password" placeholder="Password" class="inputUserData" id="inputUserPassword"/>
            <a id="btnSendPassword">Did you forget your password?</a>
            <div class="containerBtn">
                <button type="submit" class="btn">
                <a>Sign In</a>
                </button>
                <p> Or</p>
            </div>
        </form>
        <div class="containerBtnSocialNetworks">
          <button class="btnSocialNetworks"><i class="fab fa-google-plus-g"></i>Login with Google</button>
        </div>
      </div>
      <div class="containerLoginSignUp">
        <p>Don't have an account?</p>
        <button class="btnSignUp">
            <a href="#/signup">Sign Up</a>
        </button>
      </div>
    </div> 
    
    
 `;
  const sectionView = document.createElement('section');
  sectionView.classList.add('containerSignIn');
  sectionView.innerHTML = viewSignIn;

  const signInForm = sectionView.querySelector('.formSignIn');
  const userEmail = sectionView.querySelector('#inputUserEmail');
  const userPassword = sectionView.querySelector('#inputUserPassword');

  signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (userEmail.value.trim() === '' || userPassword.value.trim() === '') {
      showModal("You can't leave blank fields");
    } else {
      signInUser(userEmail.value, userPassword.value, checkingUser, errorHandler);
    }
  });

  const googleAuth = sectionView.querySelector('.btnSocialNetworks');
  googleAuth.addEventListener('click', (e) => {
    signInGoogle(e, checkIfUserExists);
  });

  const btnSendPassword = sectionView.querySelector('#btnSendPassword');
  btnSendPassword.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = '#/sendEmail';
  });

  return sectionView;
};
