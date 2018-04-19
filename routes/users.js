const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/UserModel');

// Register
router.post('/register', (req, res, next) => {
    var newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    });

    User.addUser(newUser, (err, user) => {
        if(err) {
            res.json({
                success: false,
                message: "Failed to register User"
            });
        } else {
            res.json({
                success: true,
                message: "User Registered Successfully!"
            });
        }
    });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user) {
            return res.json({
                success: false,
                message: "User not found!"
            });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch) {
                var token = jwt.sign(user, config.secret, {
                    expiresIn: 9000 //15 mins
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user:  {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                res.json({
                    success: false,
                    message: "Wrong Password!"
                });
            }
        });
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}),(req, res, next) => {
    res.json({user: req.user});
});

module.exports = router;