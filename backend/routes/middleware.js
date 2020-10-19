const Role = require('../models/Role');
var User = require('../models/User')

exports.checkPermissions = async (req, res, next) => {

    if (req.session !== null) {
        if (req.session.passport == null || req.session.passport.user == null) {
            res.status(404).redirect('/login');
        }
        else {
            let user = await findUser(req.session.passport.user);
            var resourceName = req.baseUrl;
            if (user.role == null) {
                return res.status(403).send({ error: 'access denied' });
            }
            var permissions = user.role.permissions.filter(perm => {
                return perm.url.includes(resourceName)
            });
            var allow = false;

            permissions.forEach(function (perm) {
                if (req.method == "POST" && perm.action == 'create') allow = true;
                else if (req.method == "GET" && perm.action == 'read') allow = true;
                else if (req.method == "PUT" && perm.action == 'update') allow = true;
                else if (req.method == "DELETE" && perm.action == 'delete') allow = true;
            })
            if (allow) next();
            else res.status(403).send({ error: 'access denied' });
        }
    }
}

async function findUser(userId) {
    return new Promise((resolve) => {
        User.findById(userId)
            .populate({
                path: 'role', model: Role
            })
            .exec((err, user) => {
                if (err) {
                    res.status(404).send({ error: 'Not found' });
                }
                else {
                    resolve(user);
                }
            })
    })
}