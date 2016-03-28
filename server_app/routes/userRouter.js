var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var helper = require('../helpers');

var UserSchema = mongoose.model('User');
var router = express.Router();
var userRouter = express.Router();

userRouter.use(bodyParser.json());

userRouter.post('/login', function(req,res,next){

	var _username = req.body.username;
	var _pass = req.body.password;
	_pass = helper.Crypto(_pass, _username);

	var User = mongoose.model('User', UserSchema);

	User.findOne({
		'login': _username,
		'password': _pass
	}, function(err, doc) {

		if (err) {
			console.error(error);
			return;
		}

		if (doc != null) {
			req.session.userId = doc.id;
			var user = {
				'sessionId': req.sessionID,
				'userId': doc.id,
				'userName': doc.name
			}
			res.json(user);
		} else {
			console.log("User not found");
			console.log(doc);
			res.sendStatus(404);
		}

	});

})

.post('/create', function(req, res, next) {
	console.log(req.body);

	var _name = req.body.username;
	var _email = req.body.email;
	var _pass = req.body.password;

	_pass = helper.Crypto(_pass, _email);

	var User = mongoose.model('User', UserSchema);
	var user = new User({
		login: _email,
		name: _name,
		password: _pass
	});

	User.findOne({
		'login': _email
	}, function(err, doc) {
		if (doc == null) {
			User.create(user, function(err, newUser) {
				if (err) {
					console.log(err);
				} else {

				}
				res.sendStatus(200, "Deu boa esse registro");
			});
		} else {
			// implement user already exist
			res.sendStatus(409);
		}
	});
});

module.exports = userRouter;