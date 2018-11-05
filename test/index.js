const { expect } = require('chai');
const sinon = require('sinon');

const middleware = require('../index')();


describe('TrailingSlash suite', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      url: '',
      path: '',
    };

    res = {
      redirect: sinon.spy(),
    };

    next = sinon.spy();
  });


  it('path with slash', () => {
    req.url += '/test/';
    req.path += '/test/';

    middleware(req, res, next);
    expect(next.notCalled).to.be.true;
    expect(res.redirect.calledOnce).to.be.true;
    expect(res.redirect.calledWith(301, '/test')).to.be.true;
  });

  it('path with slash and query', () => {
    req.url += '/test/?query=true&awesome=sauce';
    req.path += '/test/';

    middleware(req, res, next);
    expect(next.notCalled).to.be.true;
    expect(res.redirect.calledOnce).to.be.true;
    expect(res.redirect.calledWith(301, '/test?query=true&awesome=sauce')).to.be.true;
  });

  it('path with slash, query and hash', () => {
    req.url += '/test/?query=true&awesome=sauce#/angular/is/shit';
    req.path += '/test/';

    middleware(req, res, next);
    expect(next.notCalled).to.be.true;
    expect(res.redirect.calledOnce).to.be.true;
    expect(res.redirect.calledWith(301, '/test?query=true&awesome=sauce#/angular/is/shit')).to.be.true;
  });

  it('path without slash', () => {
    req.url += '/test';
    req.path += '/test';

    middleware(req, res, next);
    expect(res.redirect.notCalled).to.be.true;
    expect(next.calledOnce).to.be.true;
  });

  it('path without slash and with query', () => {
    req.url += '/test?query=true&awesome=sauce';
    req.path += '/test';

    middleware(req, res, next);
    expect(res.redirect.notCalled).to.be.true;
    expect(next.calledOnce).to.be.true;
  });

  it('path without slash, with query and hash', () => {
    req.url += '/test?query=true&awesome=sauce#/angular/is/shit';
    req.path += '/test';

    middleware(req, res, next);
    expect(res.redirect.notCalled).to.be.true;
    expect(next.calledOnce).to.be.true;
  });
});
