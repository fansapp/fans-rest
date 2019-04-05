import chai, { expect } from 'chai';
import create from '../create';

chai.should();

describe('POST', () => {
  it('fetches data and converts to JS object', () => {
    const rest = create();
    rest
      .post('https://jsonplaceholder.typicode.com/posts', {
        title: 'foo',
        body: 'bar',
        userId: 1
      })
      .then(response => {
        response.body.should.be.a('string');
        response.title.should.be.a('string');
        response.id.should.be.a('number');
      });
  });

  it('fetches data and returns it as is', () => {
    const rest = create({headers: { 'Content-Type': undefined }});
    rest
      .post('https://jsonplaceholder.typicode.com/posts', JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1
      }))
      .then(response => {
        expect(response.body).to.be.undefined
        expect(response.title).to.be.undefined
        response.id.should.be.a('number');
      });
  });
});
