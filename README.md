middleware-trailingslash
========================

ExpressJS middleware that redirects requests with trailing slashes to a clean one without it

## Usage:

```
app.use(require('middleware-trailingslash')());
```

When used together with serve-static, pass `redirect: false` option to it to avoid conflicts:

```
app.use(require('serve-static')(`${__dirname}/public`, { redirect: false }));
```
