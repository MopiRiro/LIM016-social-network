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
  orderBy,
  query,
} from '../config.js';

export { orderBy };

const colRef = collection(db, 'Posts');

export function createPost(description, id, postAuthor) {
  return addDoc(colRef, {
    description,
    id,
    postAuthor,
    date: Date.now(),
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
