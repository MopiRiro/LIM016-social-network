import {
  db,
  doc,
  getDocs,
  getDoc,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from '../config.js';

const colRef = collection(db, 'Posts');
const colRefUser = collection(db, 'userProfile');

export function createPost(description, id, postAuthor, date) {
  return addDoc(colRef, {
    description,
    id,
    postAuthor,
    date,
    likes: [],
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
  return onSnapshot(colRef, callback);
}
export function deletePost(id) {
  return deleteDoc(doc(db, 'Posts', id));
}

/* USER INFO */
export function createUserInfoProfile(name, id, nickname, aboutUser, favoriteMovie, favoriteGenre) {
  return addDoc(colRefUser, {
    name, id, nickname, aboutUser, favoriteMovie, favoriteGenre,
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
