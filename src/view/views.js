import SignIn from './signin.js';
import SignUp from './signup.js';
import TimeLine from './timeline.js';
import SendEmail from './sendEmailPassword.js';
import PageNotFound from './404.js';

const components = {
  signin: SignIn,
  signup: SignUp,
  timeline: TimeLine,
  sendEmail: SendEmail,
  pageNotFound: PageNotFound,
};

export { components };
