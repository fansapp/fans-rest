import chai from 'chai';
import create from '../create';


chai.should();

describe('POST', () => {
  let rest;

  beforeEach( () => {
    rest = create();
  });

  it('fetches data and converts to JS object', () =>
    rest.post('https://jsonplaceholder.typicode.com/posts', {
      title: 'foo',
      body: 'bar',
      userId: 1,
    })
    .then(response => {
      response.body.should.be.a('string');
      response.title.should.be.a('string');
      response.id.should.be.a('number');
    }));
});
