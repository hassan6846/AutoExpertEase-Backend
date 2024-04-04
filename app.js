const express = require("express");
const app = express();
const fileupload = require("express-fileupload")
const cors = require("cors");
require("dotenv").config()


//Middlewares
///////////////////////////////////////////////////

app.disable("x-powered-by")//hiding tech stack from Hacker..
app.use(fileupload()) //using fileupload middleware.
app.use(cors({
    origin: true //cors policy...

}));
app.use(express.json())//server is json type.

///////////////////////////////////////////////////




///Routes
const chatbot = require("./routes/Chatbot")
const auth = require("./routes/AuthRoutes");


///Endpoints
app.use('/api', chatbot) //chatbot
app.use('/api', auth)

module.exports = app