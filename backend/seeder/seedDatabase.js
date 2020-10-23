const bcrypt = require('bcryptjs');
const Role = require("../models/Role");
const User = require("../models/User");
const Permission = require("../models/Permission");

var roles;
var permissions;

exports.seedDatabase = () => {
    return new Promise((resolve, reject) => {
        Role.find()
            .exec()
            .then(async (roles) => {
                if (roles.length == 0) {
                    //seed database once
                    await seedPermissions();
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

function seedPermissions() {
    return new Promise(async (resolve, reject) => {
        const readRolePermission = new Permission({
            name: 'RoleRead',
            description: 'Can read roles',
            value: 0
        })
        await readRolePermission.save();

        const updateRolePermission = new Permission({
            name: 'RoleUpdate',
            description: 'Can update a role entry',
            value: 1
        })
        await updateRolePermission.save();

        const createRolePermission = new Permission({
            name: 'RoleCreate',
            description: 'Can create a role entry',
            value: 2
        })
        await createRolePermission.save();

        const deleteRolePermission = new Permission({
            name: 'RoleDelete',
            description: 'Can delete a role entry',
            value: 3
        })
        await deleteRolePermission.save();

        const readUserPermission = new Permission({
            name: 'UserRead',
            description: 'Can read users',
            value: 4
        })
        await readUserPermission.save();

        const updateUserPermission = new Permission({
            name: 'UserUpdate',
            description: 'Can update a user entry',
            value: 5
        })
        await updateUserPermission.save();

        const createUserPermission = new Permission({
            name: 'UserCreate',
            description: 'Can create a user entry',
            value: 6
        })
        await createUserPermission.save();

        const deleteUserPermission = new Permission({
            name: 'UserDelete',
            description: 'Can delete a user entry',
            value: 7
        })
        await deleteUserPermission.save();

        const feature1Permission = new Permission({
            name: 'Feature1',
            description: 'Can read feature1',
            value: 8
        })
        await feature1Permission.save();

        permissions = {
            readRolePermission, updateRolePermission, createRolePermission, deleteRolePermission,
            readUserPermission, updateUserPermission, createUserPermission, deleteUserPermission,
            feature1Permission
        };
        resolve();
    })
}

function seedRoles() {
    return new Promise(async (resolve) => {
        const userRole = new Role({
            name: 'user',
            permissions: [
                permissions.readRolePermission,
                permissions.readUserPermission
            ]
        })
        await userRole.save();

        const managerRole = new Role({
            name: 'manager',
            permissions: [
                permissions.readRolePermission,
                permissions.readUserPermission,
                permissions.updateUserPermission,
                permissions.createUserPermission,
                permissions.deleteUserPermission
            ]
        })
        await managerRole.save();

        const adminRole = new Role({
            name: 'admin',
            permissions: [
                permissions.readRolePermission, permissions.updateRolePermission, permissions.createRolePermission, permissions.deleteRolePermission,
                permissions.readUserPermission, permissions.updateUserPermission, permissions.createUserPermission, permissions.deleteUserPermission,
                permissions.feature1Permission
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