/* eslint-disable max-len */
import {
  db,
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  orderBy,
  query,
} from './config.js';

// const colRef = collection(db, 'Posts');

export const createPost = async (description, id, postAuthor, postPhoto) => {
  const colRef = await collection(db, 'Posts');
  return addDoc(colRef, {
    description,
    id,
    postAuthor,
    date: Date.now(),
    likes: [],
    postPhoto,
  });
};

export const updatePost = async (id, updatedPost) => {
  const fullColRef = await doc(db, 'Posts', id);
  return updateDoc(fullColRef, updatedPost);
};

export const getPost = async (id) => {
  const fullColRef = await doc(db, 'Posts', id);
  return getDoc(fullColRef);
};

export const getPostNow = async (callback) => {
  const colRef = await collection(db, 'Posts');
  const order = query(colRef, orderBy('date', 'desc'));
  return onSnapshot(order, callback);
};

export const deletePost = async (id) => {
  const fullColRef = await doc(db, 'Posts', id);
  return deleteDoc(fullColRef);
};

/* USER INFO */
export const createUserColl = async (idUser, name, nickname, email, photo, aboutUser, favMovie, city, interests) => {
  const fullUserRef = await doc(db, 'userProfile', idUser);
  return setDoc(fullUserRef, {
    name,
    nickname,
    email,
    photo,
    uid: idUser,
    aboutUser,
    favMovie,
    city,
    interests,
  });
};

export const updateUserInfoProfile = async (idUser, updatedPost) => {
  const fullUserRef = await doc(db, 'userProfile', idUser);
  return updateDoc(fullUserRef, updatedPost);
};

export const getUserInfoProfile = async (idUser) => {
  const fullUserRef = await doc(db, 'userProfile', idUser);
  return getDoc(fullUserRef);
};
