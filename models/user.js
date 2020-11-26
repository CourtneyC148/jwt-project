const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [ true, 'please enter an email'],
        unique: true,
        lowercase: true,
        validate: [ (isEmail), 'please enter vaild email' ]
    },
    password: {
        type: String,
        required: [true, 'please enter a password'],
        minLength: [6, 'minimum length is 6 characters']
    }
});

// fire a function after doc save to database
userSchema.post('save', function(doc, next) {
    console.log('new user was created and save', doc);
    next();
})

// fire before a doc is saved 
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const User = mongoose.model('user', userSchema);
module.exports = User;