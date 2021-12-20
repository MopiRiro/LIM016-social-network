/* eslint-disable no-console */
import { signInUser, signInGoogle } from '../lib/auth.js';

import { showModal } from '../functions/modals.js';

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
    if (userEmail.value === '' && userPassword.value === '') {
      e.preventDefault();
      showModal("You can't leave fields blank");
    }

    signInUser(userEmail.value, userPassword.value).then((userCredential) => {
    // Signed in
      const user = userCredential.user;
      console.log(user);
      window.location.hash = '#/timeline';
      // console.log('Usuario reconocido');
    // ...
    })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/user-not-found') {
          showModal('User not found');
        } else if (errorCode === 'auth/wrong-password') {
          showModal("Password doesn't match user");
        }
        // console.log(errorCode);
      });
  });

  // userState((user) => {
  //   if (user) {
  //     // User is signed in, see docs for a list of available properties
  //     // https://firebase.google.com/docs/reference/js/firebase.User
  //     const uid = user.uid;
  //     window.location.hash = '#/timeline';
  //     console.log(uid);
  //     // ...
  //   } else {
  //     // User is signed out
  //     window.location.hash = '#/';
  //     // ...
  //   }
  // });
  const googleAuth = sectionView.querySelector('.btnSocialNetworks');
  googleAuth.addEventListener('click', (e) => {
    e.preventDefault();
    signInGoogle().then(() => {
    // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // console.log(token);
      // // The signed-in user info.
      // const user = result.user;
      // console.log(user.displayName);
      // console.log(user.photoURL);
      window.location.hash = '#/timeline';
    // ...
    }).catch((error) => {
    // Handle Errors here.
      const errorCode = error.code;
      console.log(errorCode);
      // const errorMessage = error.message;
      // showModal(errorMessage);
      // // The email of the user's account used.
      // const email = error.email;
      // showModal(email);
    // ...
    });
  });

  const btnSendPassword = sectionView.querySelector('#btnSendPassword');
  btnSendPassword.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = '#/sendEmail';
  });

  return sectionView;
};
