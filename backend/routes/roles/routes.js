const router = require('.');
var Role = require('../../models/Role')

exports.create = function (req, res) {
    var role = new Role(req.body.role);
    role.save((err) => {
        if (err) {
            res.status(401).send({ error: err.message });
        }
        else {
            res.status(200).send({ role: role });
        }
    })
}

exports.getAll = function (req, res) {
    Role.find({})
        .exec((err, roles) => {
            if (err) {
                res.status(401).send({ error: err.message });
            }
            else {
                res.status(200).send({ roles: roles });
            }
        })
}