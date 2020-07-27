const User = require('../models/user');
const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");

const dotenv = require('dotenv');
dotenv.config({ path: './config.env'});

// using promise
exports.signup = async (req, res) => {
        const user = new User(req.body)
    
        try {
            await user.save()
            const token = await user.generateAuthToken()
            res.status(201).json({ user, token })
            console.log("i'm invoked----- created here")
        } catch (e) {
            res.status(400).json(e)
            console.log(e)
        }
    }


exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
    
        if (!user) {
            throw new Error('Unable to login')
        }
        const isMatch = await bcrypt.compare(password, user.password)
    
        if (!isMatch) {
            throw new Error('Unable to login')
        }
        const token = await user.generateAuthToken()
        return res.json({ user, isMatch, token })
    } catch (e) {
        res.status(400).json()
        console.log(e)
    }
}



exports.signout = async (req, res) => {

    try {
        console.log(req.body);
        
        const id = mongoose.Types.ObjectId(req.body._id);
        console.log(`the type of id is ${typeof(id)}`)
        const reqtoken = req.body.token
        
        const user = await User.findOne({ _id: id, 'tokens.token': reqtoken })
        
        user.tokens = user.tokens.filter((token) => {
            return token.token !== reqtoken
        })
        await user.save()
        return res.json()
    } catch (e) {
        res.status(500).json()
        console.log(e)
    }
}


exports.isAdmin = (req, res, next) => {
    if (req.user.role === 0) {
        return res.status(403).json({
            error: 'Admin resourse! Access denied'
        });
    }
    next();
};

