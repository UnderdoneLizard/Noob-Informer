//connect mongoose 
const mongoose = require("mongoose");

//make schema 
const devSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        games: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Game',
        }],
        description: {type: String, required: true},
        icon: {type: String, required: true},
        link: {type: String, required: true}
    },
    {
        timestamps: true,
    }
)
const Dev = mongoose.model("Dev", devSchema);
module.exports = Dev;
