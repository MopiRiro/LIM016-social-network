import {
  storage, ref, uploadBytes, getDownloadURL,
} from './config.js';

// const storageRef = ref(storage, 'someChild');

export const uploadImg = async (path, file) => {
  const photoRef = await ref(storage, path);
  return uploadBytes(photoRef, file);
};
export const getLink = async (path) => {
  const photoRef = await ref(storage, path);
  return getDownloadURL(photoRef);
};
