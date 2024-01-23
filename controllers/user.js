const express = require('express');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')

const RegisterUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error('All Fields are Mandatory')
    }
    const AvailableUser = await User.findOne({ email })
    if (AvailableUser) {
        res.status(400);
        throw new Error('Username with this Email ID Already exists')
    }
    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    })
    if (user) {
        res.status(200).json({ _id: user.id, email: user.email })
    } else {
        res.status(400);
        throw new Error('User Data is not Valid')
    }
    res.json({ message: "Register the User" })
})

const LoginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error(`All the fields are mandatory`)
    }
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        ); 
        res.status(200).json({ accessToken }); 
    }else{
        res.status(401);
        throw new Error(`Username or Email is not valid`)
    }
    res.json({ message: "Login User" })
})


const LoggedInUser = asyncHandler(async (req, res) => {
    res.json({ message: "Current User Information" })
})

module.exports = { RegisterUser, LoginUser, LoggedInUser }