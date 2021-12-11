const signInWithEmailAndPassword = jest.fn(() => Promise.resolve());
const auth = jest.fn();

const signInWithPopup = jest.fn(() => Promise.resolve());
const provider = jest.fn();

export {
  signInWithEmailAndPassword,
  auth,
  signInWithPopup,
  provider,
};
