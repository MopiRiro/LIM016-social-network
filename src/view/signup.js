export default ()=>{

    const viewSignUp= `
    <div class="containerTitleSignIn">
    <h2>Sign Up</h2>
   </div>
   <div class="containerUserData">
     <form action="" class="signUpForm">
      <input type="email" placeholder="Email" class="inputUserData"/>
      <input type="password" placeholder="Password" class="inputUserData"/>
    <div class="containerBtn">
      <button class="btn">
        <a href="#/"> Sign Up</a>   <!--esto nos debe llevar al signin-->
      </button>
      <p>O ingresa con... </p>
    </div>
     </form>
    </div>
   <div class="containerBtnSocialNetworks">
     <button class="btnSocialNetworks"><i class="fab fa-facebook"></i></button>
     <button class="btnSocialNetworks"><i class="fab fa-google-plus-g"></i></button>
   </div> 
    `
    const sectionView= document.createElement('section');
    sectionView.classList.add('containerSignUp')
    sectionView.innerHTML= viewSignUp;

    return sectionView;
}