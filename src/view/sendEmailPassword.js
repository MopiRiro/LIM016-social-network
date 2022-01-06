/* eslint-disable no-console */
import { sendPassword } from '../Firebase/auth.js';

import { showModal } from '../functions/modals.js';

export default () => {
  const viewSendEmailPassword = `
  <div class='containerImgSignUp'>
    <img src='../src/img/imgClaqueta.png'>
  </div> 
    <div class='containerSendPasswordEmail'> 
        <div class="containerTitleSignIn">
          <h2>Forgot your password?</h2> 
        </div>
      <div class="containerUserData">
        <form class="sendPasswordForm">
            <p>Don't worry! Enter your email and we'll send you a link to reset your password</p>
            <input type="email"  class="inputUserData" id="inputEmailChangePassword" placeholder="Email">
            <div class="containerBtn">
                <button type="submit" class="btn">
                <a>Reset password</a>
                </button>
            </div>
        </form>
        <button class="btnGoToEmail">
            <a href = "https://mail.google.com/" target="_blank">Go to my email</a>
        </button>
      </div>
    </div>

  `;
  const sectionView = document.createElement('section');
  sectionView.classList.add('containerSendPassword');
  sectionView.innerHTML = viewSendEmailPassword;

  const sendPasswordForm = sectionView.querySelector('.sendPasswordForm');
  const inputEmailChangePassword = sectionView.querySelector('#inputEmailChangePassword');
  sendPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendPassword(inputEmailChangePassword.value).then(() => {
      sendPasswordForm.reset();
      // Password reset email sent!
      // ..
      showModal('Link sent! Check your email');
    }).catch((error) => {
      const errorCode = error.code;
      // const errorMessage = error.message;
      // const message1 = 'auth/user-not-found';
      // const message2 = 'auth/missing-email';
      console.log(errorCode);
      if (errorCode === 'auth/user-not-found') {
        showModal('User not found');
      } else if (errorCode === 'auth/missing-email') {
        showModal("You can't leave blank fields");
      }
    });
  });
  return sectionView;
};
