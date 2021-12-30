import SignIn from './signin.js';
import SignUp from './signup.js';
import TimeLine from './timeline.js';
import SendEmail from './sendEmailPassword.js';
import PageNotFound from './404.js';
import UserProfile from './userProfile.js';
import NavBar from './navBar.js';
import PostCreation from './sendPost.js';
import UserInformation from './userInformation.js';

const components = {
  signin: SignIn,
  signup: SignUp,
  timeline: TimeLine,
  sendEmail: SendEmail,
  pageNotFound: PageNotFound,
  userProfile: UserProfile,
  navBar: NavBar,
  postCreation: PostCreation,
  userInformation: UserInformation,
};

export { components };
