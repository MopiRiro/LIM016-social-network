/* eslint-disable no-console */

import {
  createPost,
} from '../../src/Firebase/firestore.js';

// import {
//   addDoc,
//   collection,
// } from '../../src/Firebase/config.js';

jest.mock('../../src/Firebase/config.js');

// global.Date = {
//   now: () => 1487076708000,
// };
describe('createPost', () => {
  it('me agrega los posts del usuario a mi colección', () => {
    createPost('hi', '123', 'me', 'photo').then((result) => {
    //   console.log(result);
      expect(result).toStrictEqual({
        values: {
          description: 'hi',
          id: '123',
          postAuthor: 'me',
          date: Date.now(),
          likes: [],
          postPhoto: 'photo',
        },
      });
    });
