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

export function createPost(description, id, postAuthor, date, likes) {
  return addDoc(colRef, {
    description, id, postAuthor, date, likes,
  });
}

export function getPosts() {
  return getDocs(colRef);
}
export function getPost(id) {
  return getDoc(doc(db, 'Posts', id));
}
export function updatePost(id, updatedPost) {
  return updateDoc(doc(db, 'Posts', id), updatedPost);
}
export function updateLike(id, updatedLike) {
  return updateDoc(doc(db, 'Posts', id), updatedLike);
}

export function getPostNow(callback) {
  return onSnapshot(colRef, callback);
}

export function deletePost(id) {
  return deleteDoc(doc(db, 'Posts', id));
}
