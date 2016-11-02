var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('./config');
var port = 3000;

var app = module.exports = express();

app.use(session({
	secret:'thisisjustrandom',
	resave: true,
	saveUninitialized: true

}));

app.use(passport.initialize());
app.use(passport.session());


passport.use(new FacebookStrategy({
  	clientID: config.id,
  	clientSecret: config.secret,
  	callbackURL: 'http://localhost:3000/auth/facebook/callback'
}, function(token, refreshToken, profile, done) {
  return done(null, profile);
}));

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
	successRedirct: '/auth/me',
	failureRedirect: '/something'
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/auth/me', function(req, res) {
	res.send(req.user);
})

app.listen(port, function(){
	console.log("Listening at port " + port)
});