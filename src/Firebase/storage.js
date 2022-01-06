import {
  storage, ref, uploadBytes, getDownloadURL,
} from './config.js';

// const storageRef = ref(storage, 'someChild');

export function uploadImg(child, file) {
  return uploadBytes(ref(storage, child), file);
}
export function getLink(path) {
  return getDownloadURL(ref(storage, path));
}
