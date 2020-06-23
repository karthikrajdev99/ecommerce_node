const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");
dotenv.config({ path: './config.env'});

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        about: {
            type: String,
            trim: true
        },
        role: {
            type: Number,
            default: 0
        },
        history: {
            type: Array,
            default: []
        },  
        tokens: [{
            token: {
                type: String,
                required: true
            }
        }]
    },
    { timestamps: true }
);

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
    

    //   you need to modify this to work with your current schema ! got it, compare and make it work
    user.tokens = user.tokens.concat({ token })

    await user.save()
    
    return token
    }

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})


module.exports = mongoose.model('User', userSchema);
