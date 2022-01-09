export const signInWithEmailAndPassword = jest.fn(() => Promise.resolve());
export const createUserWithEmailAndPassword = jest.fn(() => Promise.resolve());
export const signOut = jest.fn(() => Promise.resolve());
export const sendPasswordResetEmail = jest.fn(() => Promise.resolve());
export const onAuthStateChanged = jest.fn(() => Promise.resolve());
export const sendEmailVerification = jest.fn(() => Promise.resolve());
export const signInWithPopup = jest.fn(() => Promise.resolve());
export const auth = jest.fn();
export const provider = jest.fn();

/* FIRESTORE */
// Date.now = jest.fn(() => 1487076708000);
export const addDoc = jest.fn((document, values) => Promise.resolve({
  values,
}));
export const db = {};
export const collection = jest.fn((db, Posts) => Promise.resolve());
export const addDoc = jest.fn((document, values) => Promise.resolve({
  values,
}));
export const collection = jest.fn((db, Posts) => Promise.resolve());
export const db = {};
// export const colRef = jest.fn((db, 'Posts')=> Promise.resolve());
