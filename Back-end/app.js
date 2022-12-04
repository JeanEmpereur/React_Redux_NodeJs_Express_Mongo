const express = require('express');
const server = express();
require("dotenv").config();
const hostname = 'localhost';
const port = 5000;

const mongoose = require('mongoose');
const DB_URL = process.env.DATABASE_URL + process.env.COLLECTION_NAME

mongoose.connect(DB_URL, {
        "useUnifiedTopology": true,
        "useNewUrlParser": true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
});

const bodyParser = require('body-parser');
server.use(bodyParser.urlencoded());
server.use(bodyParser.json());

const cors = require('cors');
server.use(cors());

const productRoute = require('./api/routes/productRoute');
productRoute(server);

const userRoute = require('./api/routes/userRoute');
userRoute(server);

server.listen(port, hostname);
console.log("server listening on port " + port);
console.log(hostname);
