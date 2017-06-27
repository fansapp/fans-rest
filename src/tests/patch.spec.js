import chai from 'chai';
import create from '../create';


chai.should();

describe('PATCH', () => {
  let rest;

  beforeEach( () => {
    rest = create();
  });

  it('fetches data and converts to JS object', () =>
    rest.patch('https://jsonplaceholder.typicode.com/posts/1', {
      title: 'coffee overdose',
    })
    .then(response => {
      response.title.should.equal('coffee overdose');
    }));
});
