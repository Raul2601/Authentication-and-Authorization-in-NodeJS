const bcrypt = require('bcryptjs')
const passport = require('passport')

var User = require('../../models/User');

exports.create = (req, res) => {
    const user = new User(req.body.user);
    user.save((err) => {
        if (err) {
            res.status(401).send({ error: err.message });
        }
        else {
            res.status(200).send({ user: user })
        }
    })
}

exports.register = (req, res) => {
    const { name, email, username, pass1, pass2 } = req.body;

    if (!name || !email || !username || !pass1 || !pass2) {
        res.status(401).send({ message: 'Please fill all fields!' });
        return;
    }

    if (pass1 != pass2) {
        res.status(401).send({ message: 'Passwords do not match!' });
        return;
    }

    User.findOne({ email: email })
        .then((user) => {
            if (user) {
                res.status(401).send({ message: 'User exist!' });
            }
            else {
                const newUser = new User({
                    name: name,
                    email: email,
                });

                // hash pass
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(pass1, salt, (err, hash) => {
                        if (err) {
                            res.status(401).send({ error: err.message })
                        }
                        newUser.password = hash;

                        newUser.save()
                            .then(() => {
                                res.redirect('/login');
                            })
                            .catch(err => res.status(401).send({ error: err.message }));
                    })
                })
            }
        })
}

exports.login = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/home',
    })(req, res, next);
}

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}

