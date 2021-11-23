const express = require('express');
 const books = require("./books.json")

//  console.log(express);
 const app = express()

app.use(express.json());


 const logger = (req, res, next)=>{
   // console.log(req.method);
   next();
};

const authenticate = (req, res, next) => {
   console.log("Authenticating");
   next();
 };

let name = "suman";

const authorise = (name) => {
  return (req, res, next) => {
    const originalSendFunc = res.send.bind(res);
    res.send = (body) => {
      body.api_requested_by = name;
      return originalSendFunc(body);
    };
    next();
  };
};


app.use(logger)




app.get("/", authorise(name), (req, res) => {
   res.send({ api_requested_by: "", books });
 });

 app.post("/",authorise(name), (req, res) => {
    
    const newUser = [...books,req.body]


    res.send(newUser);
 });


 app.get("/books/:id", authorise(name), (req, res) => {
   const book = books.filter((book) => book.id === +req.params.id);
   res.send({ api_requested_by: "", book });
 });

 app.patch("/books/:id", authorise(name), (req, res) => {
  const {id} = req.params;
  const {author, publissed_date} = req.body;
  const book = books.find((book) => book.id === +id);
  book.author = author;
  book.publissed_date = publissed_date;
  res.send({api_requested_by: "", books});
});

app.delete("/books/:id", authorise(name), (req, res) => {
  const { id } = req.params;
  const newBooks = books.filter((book) => book.id !== +req.params.id);
  res.send({api_requested_by:"",newBooks});
});

 app.listen(5432,function () {
     console.log("listening on port 5432");
 })

 