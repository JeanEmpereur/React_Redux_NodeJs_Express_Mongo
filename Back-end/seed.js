const fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
require("dotenv").config();
const url = process.env.DATABASE_URL;

const dataUser = JSON.parse(fs.readFileSync('./data/user.json', 'utf8'));
const dataProduct = JSON.parse(fs.readFileSync('./data/product.json', 'utf8'));

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbo = db.db("test");
    dbo.collection("users").insert(dataUser, function(err, res) {
        if (err) throw err;
        console.log("All the user inserted.");
        db.close();
    });
    dbo.collection("products").insert(dataProduct, function(err, res) {
        if (err) throw err;
        console.log("All the product inserted.");
        db.close();
    });
});