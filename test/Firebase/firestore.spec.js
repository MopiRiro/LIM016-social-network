/* eslint-disable no-console */

import {
  // createPost,
  updatePost, getPost, deletePost, createUserColl,
} from '../../src/Firebase/firestore.js';

import {
  updateDoc,
  doc,
  getDoc,
  deleteDoc,
  setDoc,
} from '../../src/Firebase/config.js';

jest.mock('../../src/Firebase/config.js');

describe('updatePost', () => {
  it('upadates un campo del post del usuario que lo creó', async () => {
    await updatePost('120', { description: 'postUpdated' });
    expect(doc.mock.calls[0][1]).toBe('Posts');
    expect(doc.mock.calls[0][2]).toBe('120');
    expect(typeof updateDoc.mock.calls[0][0]).toBe('object');
  });
});

describe('getPost', () => {
  it('me trae el post que el usuario creó', async () => {
    await getPost('120');
    expect(doc.mock.calls[0][1]).toBe('Posts');
    expect(doc.mock.calls[0][2]).toBe('120');
    expect(typeof getDoc.mock.calls[0][0]).toBe('object');
  });
});

describe('deletePost', () => {
  it('elimina el post del usuario que lo creó', async () => {
    await deletePost('120');
    expect(doc.mock.calls[0][1]).toBe('Posts');
    expect(doc.mock.calls[0][2]).toBe('120');
    expect(typeof deleteDoc.mock.calls[0][0]).toBe('object');
  });
});

describe('createUserColl', () => {
  it('me crea una colleción de usuarios con su uid', async () => {
    await createUserColl('120');
    expect(doc.mock.calls[0][1]).toBe('Posts');
    expect(doc.mock.calls[0][2]).toBe('120');
    expect(typeof setDoc.mock.calls[0][0]).toBe('object');
  });
});


