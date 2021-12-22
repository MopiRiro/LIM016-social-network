import SignIn from './signin.js';
import SignUp from './signup.js';
import TimeLine from './timeline.js';
import SendEmail from './sendEmailPassword.js';
import PageNotFound from './404.js';
import UserProfile from './userProfile.js';

const components = {
  signin: SignIn,
  signup: SignUp,
  timeline: TimeLine,
  sendEmail: SendEmail,
  pageNotFound: PageNotFound,
  userProfile: UserProfile,
};

export { components };
