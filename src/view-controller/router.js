import { components } from '../view/views.js';

const changeViews = (route) => {
  const sectionMain = document.getElementById('container');
  sectionMain.innerHTML = '';
  switch (route) {
    case '#/': {
      return sectionMain.appendChild(components.singIn());
    }
    case '#/signup': {
      return sectionMain.appendChild(components.signUp());
    }
    case '#/timeline': {
      return sectionMain.appendChild(components.timeLine());

    // default:
    //     break;  
    }
  }
//   console.log(route);
};

export { changeViews };
