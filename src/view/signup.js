export default () => {
  const viewSignUp = `
    <div class="containerImgSignUp">
      <img src="../src/img/imgClaqueta.png">
    </div> 
    <div class ="containerUserSignUp">
        <div class="containerTitleSignIn">
          <h2>Movie Talk</h2>
          <h2>Sign Up</h2>
        </div>
        <div class="containerUserData">
          <form action="" class="signUpForm">
              <input type="email" placeholder="Email" class="inputUserData"/>
              <input type="password" placeholder="Password" class="inputUserData"/>
              <div class="containerBtn">
                  <button class="btn">
                      <a href="#/">Sign Up</a>
                  </button>
              </div>
          </form>
        </div>
        <div class="separation">
          <div class="firstLine"></div> 
          <div class="circle"> </div> 
          <div class="secondLine"> </div> 
        </div>
        <div class="containerBtnSocialNetworks">
          <button class="btnSocialNetworks">
            <i class="fab fa-google-plus-g"></i>Login with Google
          </button>
        </div>     
    </div> 
  <section class="modal" id="modal">
  </section>
   `;
  const sectionView = document.createElement('section');
  sectionView.classList.add('containerSignUp');
  sectionView.innerHTML = viewSignUp;

  const navBar = document.querySelector('.header');
  navBar.style.display = 'none';

  const showFooter = document.querySelector('.footer');
  showFooter.style.display = 'block';

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
  const userEmail = sectionView.querySelector('#inputUserEmail');
  const userPassword = sectionView.querySelector('#inputUserPassword');

  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailRegEx = /\S+@\S+\.\S+/;

    if (userEmail.value === '' || userPassword.value === '') {
      e.preventDefault();
      showModal('No puedes dejar espacios en blanco');
    } else if (emailRegEx.test(userEmail.value) === false) {
      e.preventDefault();
      showModal('Coloca tu correo completo');
    } else if (passwordRegEx.test(userPassword.value) === false) {
      e.preventDefault();
      showModal(
        // eslint-disable-next-line function-paren-newline
        'Tu contraseña debe tener mínimo ocho caracteres, al menos una letra mayúscula, una letra minúscula, un número y un carácter especial');
    } else if (
      emailRegEx.test(userEmail.value) === true
      && passwordRegEx.test(userPassword.value) === true
    ) {
      e.preventDefault();
      window.location.hash = '#/';
      // signInForm.reset();
    }
  });

  return sectionView;
};
