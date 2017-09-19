import chai, { expect } from 'chai';
import create from '../create';


chai.should();

describe('PUT', () => {
  let rest;

  beforeEach(() => {
    rest = create();
  });

  it('fetches data and converts to JS object', () => {
    const payload = {
      test1: "testing",
      test2: 42,
      test3: {
        test4: true,
      },
    };

    return rest.put('https://jsonplaceholder.typicode.com/posts/1', payload)
      .then(response => {
        expect(response).to.eql({ ...payload, id: 1 });
      });
  });
});
