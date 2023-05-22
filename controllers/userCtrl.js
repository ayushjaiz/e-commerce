const User = require('../models/userModel')
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')

const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
        //create a new user
        const newUser = await User.create(req.body);
        res.json(newUser);
        console.log(newUser);
    }
    else {
        // res.json({
        //     msg: "User Already Exists",
        //     success: false,
        // })
        throw new Error("User Already Exists")
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    if (findUser) {
        if (findUser.isPasswordMatched(req.body.password)) {
            const token = jwt.sign({ _id: findUser._id }, process.env.JWT_SECRET, {
                expiresIn: 3600,
            });
            res.json({
                token: token,
                user: findUser.firstname,
                success: true,
            })
        }
        else {
            res.json({
                msg: "Incorrect Password",
                success: false,
            })
        }
    }
    else {
        throw new Error("User do not exists")
    }
})

module.exports = { createUser, loginUser };