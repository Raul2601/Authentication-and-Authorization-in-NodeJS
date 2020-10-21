const bcrypt = require('bcryptjs');
const Role = require("../models/Role");
const User = require("../models/User");

var roles;

exports.seedDatabase = () => {
    return new Promise((resolve, reject) => {
        Role.find()
            .exec()
            .then(async (roles) => {
                if (roles.length == 0) {
                    //seed database once
                    await seedRoles()
                    await seedUsers();
                    resolve();
                }
                else {
                    reject('Database already seeded')
                }
            })
    })
}

function seedRoles() {
    return new Promise(async (resolve) => {
        const userRole = new Role({
            name: 'user',
            permissions: [
                {
                    name: 'RoleRead',
                    description: 'Can read roles',
                    value: 0
                },
                {
                    name: 'UserRead',
                    description: 'Can read users',
                    value: 4
                }
            ]
        })
        await userRole.save();

        const managerRole = new Role({
            name: 'manager',
            permissions: [
                {
                    name: 'RoleRead',
                    Description: 'Can read roles',
                    Value: 0
                },
                {
                    name: 'UserRead',
                    description: 'Can read users',
                    value: 4
                },
                {
                    name: 'UserUpdate',
                    description: 'Can update a user entry',
                    value: 5
                },
                {
                    name: 'UserCreate',
                    description: 'Can create a user entry',
                    value: 6
                },
                {
                    name: 'UserDelete',
                    description: 'Can delete a user entry',
                    value: 7
                }
            ]
        })
        await managerRole.save();

        const adminRole = new Role({
            name: 'admin',
            permissions: [
                {
                    name: 'RoleRead',
                    Description: 'Can read roles',
                    Value: 0
                },
                {
                    name: 'RoleUpdate',
                    description: 'Can update a role entry',
                    value: 1
                },
                {
                    name: 'RoleCreate',
                    description: 'Can create a role entry',
                    value: 2
                },
                {
                    name: 'RoleDelete',
                    description: 'Can delete a role entry',
                    value: 3
                },
                {
                    name: 'UserRead',
                    description: 'Can read users',
                    value: 4
                },
                {
                    name: 'UserUpdate',
                    description: 'Can update a user entry',
                    value: 5
                },
                {
                    name: 'UserCreate',
                    description: 'Can create a user entry',
                    value: 6
                },
                {
                    name: 'UserDelete',
                    description: 'Can delete a user entry',
                    value: 7
                }
            ]
        })
        await adminRole.save();

        roles = { userRole, managerRole, adminRole };
        resolve();
    })
}

async function seedUsers() {

    const userAlex = new User({
        name: 'Alex',
        email: 'alex@gmail.com',
        password: await hashPassword('alex'),
        role: roles.userRole
    })
    await userAlex.save();

    const userBogdan = new User({
        name: 'Bogdan',
        email: 'bogdan@gmail.com',
        password: await hashPassword('bogdan'),
        role: roles.managerRole
    })
    await userBogdan.save();

    const userAdmin = new User({
        name: 'admin',
        email: 'admin@gmail.com',
        password: await hashPassword('admin'),
        role: roles.adminRole
    })
    await userAdmin.save();
}

function hashPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err)
                reject(err);
            bcrypt.hash(password, salt, (err, hash) => {
                if (err)
                    reject(err);
                resolve(hash);
            })
        })
    })
}