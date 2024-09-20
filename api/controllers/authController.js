const User = require('../models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');

module.exports.signup_post = async(req, res) => {
    const {username, email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({error: "User already exists"})
        }

        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(password, salt);

        const newUser = new User({
            username, 
            email,
            password: hashed
        })

        const savedUser = await newUser.save();

        const token = jwt.sign({
            id: savedUser._id,
            email: savedUser.email
        }, process.env.JWT_SECRET);

        res.cookie('token', token, { httpOnly: true });
        return res.json({
            id: savedUser._id,
            email: savedUser.email,
            username: savedUser.username
        });
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}

module.exports.login_post = async(req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'User does not exist' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid Password' });
        }

        const tokenData = {
            id: user._id,
            email: user.email
        };

        const token = jwt.sign(tokenData, process.env.JWT_SECRET);

        res.cookie('token', token, { httpOnly: true});

        return res.json({
            id: user._id,
            username: user.username,
            email: user.email
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports.logout = async(req, res) => {
    res.cookie('token', '', {httpOnly: true, maxAge: 1}).json();
}