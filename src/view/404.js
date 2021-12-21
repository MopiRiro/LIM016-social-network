export default () => {
  const view404 = `
  <div class="container404Message">
  <h2 class="message404"> Ups !!</h2>
  <h2 class="message404"> Page not found</h2>
  <img src="./img/imgClaqueta.png" alt="">
  </div>
  `;
  const sectionView = document.createElement('section');
  sectionView.classList.add('container404');
  sectionView.innerHTML = view404;
  return sectionView;
};
