//External Modules
const express = require('express');
<<<<<<< HEAD
=======
//bring method override express session and connect mongo
//require path

//Internal modules 
//require db and controllers index 
>>>>>>> 737b52f39e6a843e26e89b55ce97fd0a54572dc6

//Instanced modules
const app = express();

//Config
const PORT = 3000;
//pass user info to all files with locals
//set engine to ejs

//Middleware
//app.use(express.static(path.join(__dirname, 'public')));
//use url encoded 
//method override
//set up session (look at express blog)

//Routes
//base route that will take user to the home page 

//auth routes

//game routes

//dev routes

//Server Listener
app.listen(PORT, () => {
    console.log(`Listening at port http://localhost:${PORT}`);
})