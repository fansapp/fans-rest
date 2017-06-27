import chai from 'chai';
import create from '../create';


chai.should();

describe('Instance creation', () => {
  let rest;

  beforeEach(() => {
    rest = create();
  });

  it('creates an instance with default config', () => {
    rest.headers.should.eql({
      'Content-Type': 'application/json',
    });
  });

  it('provides HTTP methods (GET, POST, PATCH) as instance methods', () => {
    rest.get.should.be.a('function');
    rest.post.should.be.a('function');
    rest.patch.should.be.a('function');
  });
});
