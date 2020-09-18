//External Modules
const express = require('express');
//Internal modules 

//Instanced modules
const app = express();
//Config
const PORT = 3000;
//Middleware

//Routes

//Server Listener
app.listen(PORT, () => {
    console.log(`Listening at port http://localhost:${PORT}`);
})