export default () => {
  const movieView = `
    <div class = "moviePosters">
      <div class ="titleAndPoster">
        <div class =" poster">
          <img src ="./img/spiderman.jpg" class ="movieImg">
        </div>
        <div class ="titleWatch">
          <p> SPIDERMAN: NO WAY HOME</p>
          <div class ="whereTowatch">
          <img src="https://img.icons8.com/nolan/64/ticket.png"/ class ="centerIcon">
          </div>
        </div>
      </div>
      <div class ="titleAndPoster">
        <div class =" poster">
          <img src ="./img/dontlookup.jpg" class ="movieImg">
        </div>
        <div class ="titleWatch">
          <p> DON'T LOOK UP</p>
          <div class ="whereTowatch">
            <img src="https://img.icons8.com/nolan/50/netflix.png"/ class ="centerIcon bigImg">
          </div>
        </div>
      </div>
      <div class ="titleAndPoster">
        <div class =" poster">
          <img src ="./img/shangchi.jpg" class ="movieImg">
        </div>
        <div class ="titleWatch">
          <p> SHANG-CHI AND THE LEGEND OF THE 10 RINGS</p>
          <div class ="whereTowatch">
          <img src="https://img.icons8.com/nolan/50/disney-plus.png"/ class ="centerIcon">
          </div>
        </div>
      </div>
      <div class ="titleAndPoster">
        <div class =" poster">
          <img src ="./img/grinch.jpg" class ="movieImg">
        </div>
        <div class ="titleWatch">
          <p> THE GRINCH</p>
          <div class ="whereTowatch">
            <img src="https://img.icons8.com/nolan/50/amazon-prime-video.png"/>
            <img src="https://img.icons8.com/nolan/50/google-play.png"/>
          </div>
        </div>
      </div>
      <div class ="titleAndPoster">
        <div class =" poster">
          <img src ="./img/joker.jpg" class ="movieImg">
        </div>
        <div class ="titleWatch">
          <p> THE JOKER</p>
          <div class ="whereTowatch">
          <img src="https://img.icons8.com/nolan/50/hbo.png"/ class ="centerIcon">
          </div>
        </div>
      </div>
    </div>
  
        `;

  const sectionView = document.createElement('section');
  sectionView.classList.add('movieSectionTimeline');
  sectionView.innerHTML = movieView;

  return sectionView;
};
