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
        <a href="https://www.cinepolis.com.pe" target="_blank"><img src="https://img.icons8.com/nolan/64/ticket.png"/ class ="centerIcon"></a>
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
          <a href="https://www.netflix.com" target="_blank"><img src="https://img.icons8.com/nolan/50/netflix.png"/ class ="centerIcon bigImg"></a>
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
        <a href="https://www.disneyplus.com" target="_blank"><img src="https://img.icons8.com/nolan/50/disney-plus.png"/ class ="centerIcon"></a>
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
        <a href="https://www.primevideo.com" target="_blank"><img src="https://img.icons8.com/nolan/50/amazon-prime-video.png"/></a>
        <a href="https://play.google.com" target="_blank"><img src="https://img.icons8.com/nolan/50/google-play.png"/></a>
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
        <a href="https://www.hbomax.com" target="_blank"><img src="https://img.icons8.com/nolan/50/hbo.png"/ class ="centerIcon"></a>
        </div>
      </div>
    </div>
  </div>

      `;

  const sectionView = document.createElement('section');
  sectionView.classList.add('movieSection');
  sectionView.innerHTML = movieView;

  return sectionView;
};
