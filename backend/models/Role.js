var mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Role name is required"]
    },
    permissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'permission',
        default: null
    }]
});

const Role = mongoose.model('Role', RoleSchema);

module.exports = Role;