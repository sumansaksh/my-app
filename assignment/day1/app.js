 const express = require('express');
 const users = require("./users2.json")

//  console.log(express);
 const app = express()

 app.get("/", (req, res) => {
    
    res.send("Welcome to Home Page")
 })

 app.get("/users", (req, res) => {
    
    res.send({users});
 });


 app.listen(1234,function () {
     console.log("listening on port 1234");
 })