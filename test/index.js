const chai = require('chai');
const spies = require('chai-spies');

const middleware = require('../index')();

chai.use(spies);
const { expect } = chai;


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
      redirect: chai.spy(() => {}),
    };

    next = chai.spy(() => {});
  });


  it('path with slash', () => {
    req.url += '/test/';
    req.path += '/test/';

    middleware(req, res, next);
    expect(res.redirect).to.have.been.called.once;
    expect(res.redirect).to.have.been.called.with(301, '/test');
  });

  it('path with slash and query', () => {
    req.url += '/test/?query=true&awesome=sauce';
    req.path += '/test/';

    middleware(req, res, next);
    expect(res.redirect).to.have.been.called.once;
    expect(res.redirect).to.have.been.called.with(301, '/test?query=true&awesome=sauce');
  });

  it('path with slash, query and hash', () => {
    req.url += '/test/?query=true&awesome=sauce#/angular/is/shit';
    req.path += '/test/';

    middleware(req, res, next);
    expect(res.redirect).to.have.been.called.once;
    expect(res.redirect).to.have.been.called.with(301, '/test?query=true&awesome=sauce#/angular/is/shit');
  });

  it('path without slash', () => {
    req.url += '/test';
    req.path += '/test';

    middleware(req, res, next);
    expect(res.redirect).to.not.have.been.called();
    expect(next).to.have.been.called();
  });

  it('path without slash and with query', () => {
    req.url += '/test?query=true&awesome=sauce';
    req.path += '/test';

    middleware(req, res, next);
    expect(res.redirect).to.not.have.been.called();
    expect(next).to.have.been.called();
  });

  it('path without slash, with query and hash', () => {
    req.url += '/test?query=true&awesome=sauce#/angular/is/shit';
    req.path += '/test';

    middleware(req, res, next);
    expect(res.redirect).to.not.have.been.called();
    expect(next).to.have.been.called();
  });
});
