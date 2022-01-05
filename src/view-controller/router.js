/* eslint-disable no-lone-blocks */
import { components } from '../view/views.js';

// eslint-disable-next-line consistent-return
const changeViews = (route) => {
  const sectionElement = document.getElementById('projectContainer');
  sectionElement.innerHTML = '';
  switch (route) {
    case '':
    case '#':
    case '#/': {
      return sectionElement.appendChild(components.signin());
    }
    case '#/signup': {
      return sectionElement.appendChild(components.signup());
    }
    case '#/timeline': {
      sectionElement.appendChild(components.navBar());
      sectionElement.appendChild(components.userInformation());
      sectionElement.appendChild(components.postCreation());
      sectionElement.appendChild(components.timeline());
      break;
    }
    case '#/moviesList': {
      sectionElement.appendChild(components.movieSection());
      sectionElement.appendChild(components.navBar());
      break;
    }
    case '#/sendEmail': {
      return sectionElement.appendChild(components.sendEmail());
    }
    case '#/userProfile': {
      sectionElement.appendChild(components.navBar());
      sectionElement.appendChild(components.userProfile());
      break;
    }
    case '#/editProfile': {
      sectionElement.appendChild(components.navBar());
      sectionElement.appendChild(components.userEditProfile());
      break;
    }
    default: {
      return sectionElement.appendChild(components.pageNotFound());
    }
  }
};

export { changeViews };
