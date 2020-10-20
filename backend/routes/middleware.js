const Role = require('../models/Role');
var User = require('../models/User')

exports.checkPermissions = async (req, res, next) => {
    return next();
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

exports.hasPermission = (perm) => {
    return async (req, res, next) => {
        if (req.session !== null) {
            if (req.session.passport == null || req.session.passport.user == null) {
                res.status(404).redirect('/login');
            }
            else {
                if (perm) {
                    let user = await findUser(req.session.passport.user);
                    if (user.role == null) {
                        return res.status(403).send({ error: 'access denied' });
                    }
                    var allow = user.role.permissions.find((item) => {
                        return item.value == perm.Value;
                    })
                    if (allow)
                        next();
                    else res.status(403).send({ error: 'access denied' });
                }
                else res.status(403).send({ error: 'access denied' });
            }
        }
        else res.status(403).send({ error: 'access denied' });
    }
}

exports.permissions = {
    // roles
    RoleRead: { Name: 'RoleRead', Description: 'Can read roles', Value: 0 },
    RoleUpdate: { Name: 'RoleUpdate', Description: 'Can update a role entry', Value: 1 },
    RoleCreate: { Name: 'RoleCreate', Description: 'Can create a role entry', Value: 2 },
    RoleDelete: { Name: 'RoleDelete', Description: 'Can delete a role entry', Value: 3 },

    // users
    UserRead: { Name: 'UserRead', Description: 'Can read users', Value: 4 },
    UserUpdate: { Name: 'UserUpdate', Description: 'Can update a user entry', Value: 5 },
    UserCreate: { Name: 'UserCreate', Description: 'Can create a user entry', Value: 6 },
    UserDelete: { Name: 'UserDelete', Description: 'Can delete a user entry', Value: 7 },

    // other permissions
    Feature1: { Name: 'Feature1', Description: 'Can read feature1', Value: 8 }
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