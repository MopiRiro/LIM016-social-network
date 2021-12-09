/* eslint-disable no-console */
// Import the functions you need from the SDKs you need
// eslint-disable-next-line import/no-unresolved
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js';
//  import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-analytics.js';
// eslint-disable-next-line import/no-unresolved
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js';

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
  <section class='modal' id='modal'>
  </section>
   `;
  const sectionView = document.createElement('section');
  sectionView.classList.add('containerSignUp');
  sectionView.innerHTML = viewSignUp;

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
  const signUpForm = sectionView.querySelector('.signUpForm');
  const showTerms = sectionView.querySelector('.showTerms');

  showTerms.addEventListener('click', () => {
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
    if (!checkBox.checked) {
      showModal('Marca la casilla');
    } else {
      window.location.hash = '#/';
    }

    createUserWithEmailAndPassword(auth, userEmail, userPassword).then((userCredential) => {
    // Signed in
      const user = userCredential.user;
      console.log('Usuario creado');
      console.log(user);

    // ...
    })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        showModal(errorMessage);
        console.log(errorCode);
      // ..
      });
  });

  return sectionView;
};
