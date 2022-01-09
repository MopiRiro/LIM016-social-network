/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
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
export const updateDoc = jest.fn(() => Promise.resolve());
export const db = {};
export const collection = jest.fn((db, Posts) => Promise.resolve({}));
// export const colRef = jest.fn((db, 'Posts')=> Promise.resolve());
export const doc = jest.fn((db, Posts, id) => Promise.resolve({}));
export const getDoc = jest.fn(() => Promise.resolve());
export const onSnapshot = jest.fn(() => Promise.resolve());
export const query = jest.fn(() => Promise.resolve());
export const orderBy = jest.fn((date, desc) => Promise.resolve());
export const deleteDoc = jest.fn(() => Promise.resolve());
export const setDoc = jest.fn((document, values) => Promise.resolve({
  values,
}));
