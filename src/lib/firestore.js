/* eslint-disable max-len */
import {
  db,
  doc,
  getDocs,
  getDoc,
  setDoc,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  orderBy,
  query,
} from '../config.js';

const colRef = collection(db, 'Posts');

export function createPostUniqueId(id, postAuthor, description) {
  return setDoc(doc(db, 'Posts', id), {
    postAuthor,
    description,
    date: Date.now(),
    likes: [],
    postId: id,
  });
}
export function updatePost(id, updatedPost) {
  return updateDoc(doc(db, 'Posts', id), updatedPost);
}
export function getPosts() {
  return getDocs(colRef);
}
export function getPost(id) {
  return getDoc(doc(db, 'Posts', id));
}
export function updateLike(id, updatedLike) {
  return updateDoc(doc(db, 'Posts', id), { likes: updatedLike });
}
export function getPostNow(callback) {
  const order = query(colRef, orderBy('date', 'desc'));
  return onSnapshot(order, callback);
}
export function deletePost(id) {
  return deleteDoc(doc(db, 'Posts', id));
}

/* USER INFO */
const colRefUser = collection(db, 'userProfile');
export function createUserInfoProfile(name, email, photo, id, aboutUser, favMovie, favGenre) {
  return addDoc(colRefUser, {
    name, email, photo, id, aboutUser, favMovie, favGenre,
  });
}

export function createUserColl(idUser, name, email, photo, aboutUser, favMovie, favGenre) {
  return setDoc(doc(db, 'userProfile', idUser), {
    name,
    email,
    photo,
    uid: idUser,
    aboutUser,
    favMovie,
    favGenre,
  });
}
export function updateUserInfoProfile(id, updatedPost) {
  return updateDoc(doc(db, 'userProfile', id), updatedPost);
}
export function getUserInfoProfile(id) {
  return getDoc(doc(db, 'userProfile', id));
}
export function getUserInfoProfileNow(callback) {
  return onSnapshot(colRefUser, callback);
}
export function deleteUserInfoProfile(id) {
  return deleteDoc(doc(db, 'userProfile', id));
}
export function getUsers() {
  return getDocs(colRefUser);
}
