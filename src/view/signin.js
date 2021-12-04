export default ()=>{
    const viewSignIn= `
    <div class="containerImgSignIn">
    <img src="../src/img/imgClaqueta.png">
    </div> 
    <div class="containerTitleSignIn">
    <h2>Movie Talk</h2>
    </div>
    <div class="containerUserData">
      <form action="" class="formSignIn">
        <input type="email" placeholder="Email" class="inputUserData" id="inputUserEmail"/>
        <input type="password" placeholder="Password" class="inputUserData" id="inputUserPassword"/>
      <div class="containerBtn">
        <button class="btn">
          <a href="#/timeline">Sign In</a>
        </button>
        <p>O ingresa con... </p>
      </div>
      </form>
    </div>
    <div class="containerBtnSocialNetworks">
    <button class="btnSocialNetworks"><i class="fab fa-facebook"></i></button>
    <button class="btnSocialNetworks"><i class="fab fa-google-plus-g"></i></button>
    </div>
    <div class="containerLoginSignUp">
    <p>¿No tienes cuenta?</p>
    <button class="btnSignUp">
      <a href="#/signup">Registrate</a>
    </button>
    </div>  
    `
    const sectionView= document.createElement('section');
    sectionView.classList.add('containerSignIn')
    sectionView.innerHTML= viewSignIn;

    return sectionView;
 }   