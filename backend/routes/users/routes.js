var User = require('../../models/User');
var Role = require('../../models/Role');

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


exports.getAll = function (req, res) {
    User.find({})
        .populate({
            path: 'role', model: Role
        })
        .exec((err, users) => {
            if (err) {
                res.status(401).send({ error: err.message });
            }
            else {
                res.status(200).send({ users: users });
            }
        })
}