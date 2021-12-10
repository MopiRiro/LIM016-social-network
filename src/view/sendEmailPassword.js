import { sendPassword } from '../firebase/auth.js';

export default () => {
  const viewSendEmailPassword = `
    <h3>Restablecer contraseña</h3>
    <input type="email" id="inputEmailChangePassword" placeholder="Email">
    <button id="btnSendEmail">Enviar</button>

    <section class="modal" id="modal">
    </section>
  `;
  const sectionView = document.createElement('section');
  sectionView.innerHTML = viewSendEmailPassword;
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
      window.location.hash = '#/';
    });
    window.addEventListener('click', (e) => {
      if (e.target === modalBox) {
        modalBox.style.display = 'none';
      }
    });
  };
  const inputEmailChangePassword = sectionView.querySelector('#inputEmailChangePassword');
  const btnSendEmail = sectionView.querySelector('#btnSendEmail');
  btnSendEmail.addEventListener('click', (e) => {
    e.preventDefault();
    sendPassword(inputEmailChangePassword.value).then(() => {
      // Password reset email sent!
      // ..
      showModal('Correo Enviado');
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      showModal(errorMessage);
      // ..
    });
  });
  return sectionView;
};
