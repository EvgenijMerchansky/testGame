const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config/index');
const path = require('path');

// connect to the database and load models
require(path.resolve(__dirname, 'models')).connect(config.dbUri);

const app = express();
// tell the app to look for static files in these directories
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));
// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));
// pass the passport middleware
app.use(passport.initialize());

// load passport strategies
const localSignupStrategy = require(path.resolve(__dirname, 'passport', 'local-signup.js'));
const localLoginStrategy = require(path.resolve(__dirname, 'passport', 'local-login.js'));
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authorization checker middleware
const authCheckMiddleware = require(path.resolve(__dirname, 'middleware', 'auth-check.js'));
app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require(path.resolve(__dirname, 'routes', 'auth.js'));
const apiRoutes = require(path.resolve(__dirname, 'routes', 'api.js'));
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);


// start the server
app.listen(9000, () => {
  console.log('Server is running on http://localhost:9000 or http://127.0.0.1:9000');
});
