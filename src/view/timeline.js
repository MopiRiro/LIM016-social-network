export default()=>{
    const viewTimeline= `
    <div class="containerUser">
    <div class="backgroundPhoto">
      <img src="./img/fondoPrueba.png" alt="">
    </div>
    <div class="containerAboutUser">
      <div class="profilePicture">
        <input type="text" class="profile">
      </div>
      <div class="userInfo">
        <p class="userName">Fulana Suarez</p>
        <p class="userAbout">MovieLover</p>
      </div>
    </div>
  </div>
  <div class="containerPosts">
    <div class="containerUserPosts">
      <div class="toPost">
        <input type="text" class="toPostInput" placeholder="¿Qué quieres compartir?">
      </div>
      <div class="uploadAndShare">
        <i class="fa fa-file-image-o circleUpload" aria-hidden="true"></i>
        <button class="shareBtn"> Compartir</button>
      </div>
    </div>
    <div class="containerOthersPosts">
      <div class="othersInfo">
        <p>Publicado por JeanCedron | Comunal</p>
        <i class="fa fa-times" aria-hidden="true"></i>
      </div>
      <div class="othersToPost">
        <input type="text" class="othersToPostInput" value="dsa"> </input>
      </div>
      <div class="likeAndShare">
        <i class="fa fa-heart circleLike" aria-hidden="true"></i>
        <i class="fa fa-paper-plane circleShare" aria-hidden="true"></i>
      </div>
    </div>
  </div>
    `
    const sectionView= document.createElement('section');
    sectionView.classList.add('containerTimeLine')

    sectionView.innerHTML= viewTimeline;

    return sectionView;
}