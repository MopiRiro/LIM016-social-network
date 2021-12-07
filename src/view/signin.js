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
  return sectionView;
};
