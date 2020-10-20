var mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Role name is required"]
    },
    permissions: [{
        name: String,
        description: String,
        value: Number,
    }]
});

const Role = mongoose.model('Role', RoleSchema);

module.exports = Role;