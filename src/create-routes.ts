var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
export function createRoutes (app) {
    app.get('/', function(req, res, next) {
    res.render('pages/index', {user:
      req.user,
      url: req.url,
    });
  });

app.get('/auth/account', ensureLoggedIn('/api/v1/users/login'), function(req, res, next) {
  res.render('pages/loginProfiles', {
    user: req.user,
    url: req.url,
  });
});

app.get('/local', function(req, res, next) {
  res.render('pages/local', {
    user: req.user,
    url: req.url,
  });
});
}