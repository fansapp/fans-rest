import chai from 'chai';
import create from '../create';


chai.should();

describe('GET', () => {
  let rest;

  beforeEach( () => {
    rest = create();
  });

  it('fetches data and converts to JS object', () =>
    rest.get('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => {
        response.body.should.be.a('string');
        response.title.should.be.a('string');
        response.id.should.be.a('number');
      }));
});
