import chai, { expect } from 'chai';
import create from '../create';


chai.should();

describe('DELETE', () => {
  let rest;

  beforeEach(() => {
    rest = create();
  });

  it('fetches data and converts to JS object', () =>
     rest.delete('https://jsonplaceholder.typicode.com/posts/1', { test: 42 })
     .then(response => {
       expect(response).to.eql({});
     }));
});
