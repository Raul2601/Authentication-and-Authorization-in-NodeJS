var Role = require('../../models/Role')

exports.create = function (req, res) {
    var role = new Role(req.body);
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

exports.getById = function (req, res) {
    const id = req.params.id;
    Role.findById(id, (err, role) => {
        if (err) {
            return res.status(401).send({ error: err.message });
        }
        res.status(200).send({ role: role });
    })
}

exports.update = function (req, res) {
    const id = req.params.id;
    const newRole = req.body;

    Role.findById(id, (err, role) => {
        if (err) {
            return res.status(401).send({ error: err.message });
        }
        role.name = newRole.name;
        role.permissions = newRole.permissions;
        role.save()
            .then(() => {
                res.status(200).send({ role: role });
            })
            .catch((err) => {
                res.status(401).send({ error: err.message });
            })
    })
}

exports.delete = function (req, res) {
    const id = req.params.id;

    Role.findByIdAndDelete(id, (err) => {
        if (err) {
            res.status(401).send({ error: err.message });
        }
        else {
            res.status(200).send();
        }
    })
}