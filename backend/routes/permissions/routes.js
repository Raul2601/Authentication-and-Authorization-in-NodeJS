const Permission = require('../../models/Permission');

exports.create = function (req, res) {
    var permission = new Permission(req.body);
    permission.save((err) => {
        if (err) {
            res.status(401).send({ error: err.message });
        }
        else {
            res.status(200).send({ permission: permission });
        }
    })
}

exports.getAll = function (req, res) {
    Permission.find({})
        .exec((err, permissions) => {
            if (err) {
                res.status(401).send({ error: err.message });
            }
            else {
                res.status(200).send({ permissions: permissions });
            }
        })
}

exports.getById = function (req, res) {
    const id = req.params.id;
    Permission.findById(id)
        .exec((err, permission) => {
            if (err) {
                return res.status(401).send({ error: err.message });
            }
            res.status(200).send({ permission: permission });
        })
}

exports.update = function (req, res) {
    const id = req.params.id;
    const newPermission = req.body;

    Permission.findById(id, (err, permission) => {
        if (err) {
            return res.status(401).send({ error: err.message });
        }
        permission.name = newPermission.name;
        permission.description = newPermission.description;
        permission.value = newPermission.value;

        permission.save()
            .then(() => {
                res.status(200).send({ permission: permission });
            })
            .catch((err) => {
                res.status(401).send({ error: err.message });
            })
    })
}

exports.delete = function (req, res) {
    const id = req.params.id;

    Permission.findByIdAndDelete(id, (err) => {
        if (err) {
            res.status(401).send({ error: err.message });
        }
        else {
            res.status(200).send();
        }
    })
}