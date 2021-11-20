const express = require('express');
 const books = require("./books.json")

//  console.log(express);
 const app = express()

app.use(express.json());


 app.get("/", (req, res) => {
    
    res.send({books});
 })

 app.post("/", (req, res) => {
    
    const newUser = [...books,req.body]


    res.send(newUser);
 });


 app.listen(5432,function () {
     console.log("listening on port 5432");
 })