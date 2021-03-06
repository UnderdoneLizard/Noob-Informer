const mongoose = require("mongoose");
console.log(process.env.MONGODB_URI)
const connectionString = process.env.MONGODB_URI || "mongodb://localhost:27017/noob";

mongoose
.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
})
.then(function () {
    console.log("Mongodb connected....");
})
.catch(function (error) {
    console.log("Mongodb connection err", error);
});

mongoose.connection.on("disconnect", function (event) {
console.log("mongodb disconnected", event);
});


module.exports = {
    Game: require("./Game"),
    Dev: require("./Dev"),
    User: require("./User")
}