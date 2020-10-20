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
