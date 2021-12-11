/* eslint-disable no-console */
import { sendPasswordResetEmail, auth } from '../firebase/config.js';

import { showModal } from '../functions/hidenav.js';

export default () => {
  const viewSendEmailPassword = `
    <h3>Restablecer contraseña</h3>
    <p>Por favor introduce tu cuenta de correo electrónico</p>
    <input type="email"  class="inputUserData" id="inputEmailChangePassword" placeholder="Email">
    <button id="btnSendEmail" class="btn">Enviar</button>
  `;
  const sectionView = document.createElement('section');
  sectionView.classList.add('containerSendPassword');
  sectionView.innerHTML = viewSendEmailPassword;

  const inputEmailChangePassword = sectionView.querySelector('#inputEmailChangePassword');
  const btnSendEmail = sectionView.querySelector('#btnSendEmail');
  btnSendEmail.addEventListener('click', (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, inputEmailChangePassword.value).then(() => {
      // Password reset email sent!
      // ..
      showModal('El correo ha sido enviado revisa tu cuenta');
    }).catch((error) => {
      const errorCode = error.code;
      // const errorMessage = error.message;
      // const message1 = 'auth/user-not-found';
      // const message2 = 'auth/missing-email';
      console.log(errorCode);
      if (errorCode === 'auth/user-not-found') {
        showModal('Usuario no encontrado');
      } else if (errorCode === 'auth/missing-email') {
        showModal('No puedes dejar campos vacíos');
      }
    });
  });
  return sectionView;
};
