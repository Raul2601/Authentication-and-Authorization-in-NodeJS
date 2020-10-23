var mongoose = require('mongoose');

const PermissionSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Permission name is required']
    },
    description: {
        type: String,
        default: null
    },
    value: {
        type: Number,
        unique: true,
        required: [true, 'Permission value is required']
    }
})

const Permission = mongoose.model('Permission', PermissionSchema);

module.exports = Permission;