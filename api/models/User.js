const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Please enter username']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please enter email']
    },
    password: {
        type: String,
        required: [true, 'Please enter password']
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;