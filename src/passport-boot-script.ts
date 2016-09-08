var loopbackPassport = require('loopback-component-passport');
var ensureLoggedIn = require('connect-ensure-login');

export function configurePassport (app, accessToken, user, identity, credential, config) {
    var PassportConfigurator = loopbackPassport.PassportConfigurator;
    var passportConfigurator = new PassportConfigurator(app);

    passportConfigurator.init();

    passportConfigurator.setupModels({
      userModel: user,
      userIdentityModel: identity,
      userCredentialModel: credential
    });
  for (var s in config) {
    var c = config[s];
    c.session = c.session !== false;
    passportConfigurator.configureProvider(s, c);
  }
  app.get('/', function(req, res, next) {
    res.render('pages/index', {user:
      req.user,
      url: req.url,
    });
  });

app.get('/auth/account', ensureLoggedIn('/login'), function(req, res, next) {
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

app.get('/signup', function(req, res, next) {
  res.render('pages/signup', {
    user: req.user,
    url: req.url,
  });
});

app.get('/login', function(req, res, next) {
  res.render('pages/login', {
    user: req.user,
    url: req.url,
  });
});

app.get('/auth/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

}