const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
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
    res.send('Authenticate');
});

// Profile
router.get('/profile', (req, res, next) => {
    res.send('Profile');
});

module.exports = router;