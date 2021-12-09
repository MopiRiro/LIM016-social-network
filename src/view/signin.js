/* eslint-disable no-console */
// Import the functions you need from the SDKs you need
// eslint-disable-next-line import/no-unresolved
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js';
//  import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-analytics.js';
// eslint-disable-next-line import/no-unresolved
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js';

const firebaseConfig = {
  apiKey: 'AIzaSyCkEJklzntAxT2mXbwjDRl3d8aMSZXVlWo',
  authDomain: 'socialnetwork-a77f4.firebaseapp.com',
  projectId: 'socialnetwork-a77f4',
  storageBucket: 'socialnetwork-a77f4.appspot.com',
  messagingSenderId: '207962313349',
  appId: '1:207962313349:web:6193488f70cb5be00d0fec',
  // eslint-disable-next-line no-template-curly-in-string
  measurementId: '${config.measurementId}',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
export default () => {
  const viewSignIn = `      
    <div class="containerImgSignIn">
      <img src="../src/img/imgClaqueta.png">
    </div> 
    <div class ="containerUserSignIn">
      <div class="containerTitleSignIn">
          <h2>Movie Talk</h2> 
          <h2>Sign In</h2>
      </div>
      <div class="containerUserData">
        <form action="" class="formSignIn">
            <input type="email" placeholder="Email" class="inputUserData" id="inputUserEmail"/>
            <input type="password" placeholder="Password" class="inputUserData" id="inputUserPassword"/>
            <a>Did you forget your password?</a>
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
    
        <section class="modal" id="modal">
        </section>
    
 `;
  const sectionView = document.createElement('section');
  sectionView.classList.add('containerSignIn');
  sectionView.innerHTML = viewSignIn;

  const navBar = document.querySelector('.header');
  navBar.style.display = 'none';

  const showModal = (message) => {
    const modalBox = sectionView.querySelector('#modal');
    modalBox.style.display = 'block';
    modalBox.innerHTML = `
      <div class='modalContent'>
      <p class='modalText'>${message}</p>
      <button class='closeModalBtn'>Entendido</button>
      </div>`;
    const modalClose = sectionView.querySelector('.closeModalBtn');
    modalClose.addEventListener('click', () => {
      modalBox.style.display = 'none';
    });
    window.addEventListener('click', (e) => {
      if (e.target === modalBox) {
        modalBox.style.display = 'none';
      }
    });
  };
  const signInForm = sectionView.querySelector('.formSignIn');
  const userEmail = sectionView.querySelector('#inputUserEmail');
  const userPassword = sectionView.querySelector('#inputUserPassword');

  signInForm.addEventListener('submit', (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, userEmail.value, userPassword.value).then((userCredential) => {
    // Signed in
      const user = userCredential.user;
      console.log('Usuario reconocido');
      window.location.hash = '#/timeline';
    // ...
    })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        showModal(errorMessage);
      });
  });

  return sectionView;
};
