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

   `;
  const sectionView = document.createElement('section');
  sectionView.classList.add('containerSignUp');
  sectionView.innerHTML = viewSignUp;
  return sectionView;
};
