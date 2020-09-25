const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema(
{
    title: {type: String, required: true, unique: true},
    releaseDate: {type: String, required: true},
    description: {type: String, required: true},
    img: {type: String, required: true},
    genre: [{type: String, required: true}],
    link: {type: String, required: true},
    rating: {type:Number, required: false},
    dev: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dev",
    }]
},{
    timestamps: true
})


const Game = mongoose.model("Game", gameSchema);

module.exports = Game;