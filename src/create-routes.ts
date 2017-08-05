import * as url from 'url';

export function createRoutes(app, options) {
  // app.get('/', function (req, res, next) {
  //     res.render('pages/index', {
  //         user: req.user,
  //         url: req.url,
  //     });
  // });
  app.get('/auth/account', (req, res, next) => {
    let _redirect = url.format({
      protocol: options.protocol,
      port: options.port,
      hostname: options.hostname,
      query: {created: Date.now(), id: req.query['access-token'], userId: req.query['user-id']}
    })
    res.redirect(_redirect);
    if (req.session && req.session.passport) delete req.session.passport;
  });
  // app.get('/login', function (req, res, next) {
  //     res.render('pages/login', {
  //         user: req.user,
  //         url: req.url,
  //     });
  // });
}