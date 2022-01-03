/* eslint-disable no-console */
import { signInUser, signInGoogle } from '../lib/auth.js';

import { showModal } from '../functions/modals.js';

import { createUserColl, getUserInfoProfile } from '../lib/firestore.js';

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
      e.preventDefault();
      showModal("You can't leave blank fields");
    }

    signInUser(userEmail.value, userPassword.value).then((userCredential) => {
    // Signed in
      const user = userCredential.user;
      // console.log(user);
      // window.location.hash = '#/timeline';
      if (user.emailVerified === true) {
        window.location.hash = '#/timeline';
      } else {
        console.log('no verificado');
        showModal('Your email must be verified, check your email');
      }
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

  const googleAuth = sectionView.querySelector('.btnSocialNetworks');
  googleAuth.addEventListener('click', (e) => {
    e.preventDefault();
    signInGoogle().then((result) => {
      const user = result.user;
      const name = user.displayName || 'New User';
      const email = user.email;
      const photo = user.photoURL ? user.photoURL : './img/profileDefault.png';
      const aboutMe = "I'm a new user";
      const movie = "I don't have one yet";
      const genre = "I dont' have one yet";
      const uid = user.uid;
      getUserInfoProfile(uid).then((docSnap) => {
        if (docSnap.exists()) {
          window.location.hash = '#/timeline';
          console.log('existes, puedes volver a entrar');
        } else {
          console.log('no existes, se debe crear uan nueva colección');
          createUserColl(uid, name, email, photo, aboutMe, movie, genre)
            .then(() => {
              window.location.hash = '#/timeline';
              console.log('nuevo usuario, chequea si se creo la nueva colección');
            })
            .catch((err) => console.log(err.message));
        }
      }).catch((err) => console.log(err));
    }).catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
    });
  });

  const btnSendPassword = sectionView.querySelector('#btnSendPassword');
  btnSendPassword.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = '#/sendEmail';
  });

  return sectionView;
};
