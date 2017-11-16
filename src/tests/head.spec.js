import chai, { expect } from 'chai';
import create from '../create';


chai.should();

describe('HEAD', () => {
  let rest;

  beforeEach(() => {
    rest = create();
  });

  it('returns an empty body', () =>
    rest.head('http://httpbin.org/anything')
      .then(response => {
        expect(response).to.eql({});
      }));
});
