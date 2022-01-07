import {
  createPost,
} from '../../src/Firebase/firestore.js';

import {
  addDoc,
  collection,
} from '../../src/Firebase/config.js';

jest.mock('../../src/Firebase/config.js');

describe('createPost', () => {
  it('me agrega los posts del usuario a mi colección', () => {
    createPost('hi').then((result) => {
      expect(result).toStrictEqual({
        description: 'hi',
      });
    }).catch((err) => console.log(err));
  });
});
