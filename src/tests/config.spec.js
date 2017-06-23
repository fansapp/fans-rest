import chai from 'chai';
import createRest from '../createRest';


chai.should();

describe('Configuration', () => {
  it('sets up headers', () => {
    const rest = createRest({
      headers: {
        'Content-Type': 'text/html',
        'Custom-Header': 'HelloWorld',
      },
    });
    rest.headers.should.eql({
      'Content-Type': 'text/html',
      'Custom-Header': 'HelloWorld',
    });
  });

  it('sets up custom response handling', () => {
    const rest = createRest({
      handleResponse: (call) => call.then(response => response.text()),
    });
    return rest.get('https://jsonplaceholder.typicode.com/posts/1')
      .then(text => {
        text.should.be.a('string');
        text.includes('body').should.be.true;
        text.includes('userId').should.be.true;
        text.includes('title').should.be.true;
      });
  });
});
