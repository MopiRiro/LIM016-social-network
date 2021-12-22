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
      return sectionElement.appendChild(components.timeline());
    }
    case '#/sendEmail': {
      return sectionElement.appendChild(components.sendEmail());
    }
    case '#/userProfile': {
      return sectionElement.appendChild(components.userProfile());
    }
    default: {
      return sectionElement.appendChild(components.pageNotFound());
    }
  }
};

export { changeViews };
