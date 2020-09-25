//include mongoose
const mongoose = require('mongoose');
//make schema 
const userSchema = mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    favGames: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game"
    }],
    favDevs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dev"
    }]
},{
    timestamps: true
})

const User = mongoose.model('User', userSchema);
module.exports = User;
