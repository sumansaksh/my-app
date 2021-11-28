//import express

const express = require("express");
const mongoose = require("mongoose");
const users = require("./users.json");


/*
connect to mongodb server
create a schema for our data 
create a model from the schema
*/
const connect = ()=>{
   return mongoose.connect("mongodb://127.0.0.1:27017/movie") 
}


//userschema
const userSchema = new mongoose.Schema({
    movie_name:{type: String, required:true},
    movie_genre: {type: String, required:false},
    production_yrar: {type: Number, required: false},
    budget: {type: Number, required:false},
},
{
versionKey:false,
timestamps:true,
}
);


///step 3
const user = mongoose.model("user",userSchema);
//define app
const app=express();
app.use(express.json());

/* 
users 
post = /user
getone = /users/:id
updateone = /users/:id
delete one= /users/:id
*/

//post operation 

    app.post("/user", async (req, res)=>{
        try{
            const users = await user.create(req.body);
            res.status(201).send(users);
            
        } catch (error) {
            return res.status(500).json({ status: "Failed", message: error.message });
          }
        });
       
   

//get users
app.get("/users",async (req,res)=>{
    const users = await user.find().lean().exec()
    res.send(users);
});
//single user
app.get("/users/:id",async (req,res)=>{
    try{
        const users = await user.findById(req.params.id).lean().exec()

        res.send(users);
    }catch(error){
        return res.status(500).json({ status: "Failed", message: error.message });
    }
    
});

app.patch("/users/:id",async (req,res)=>{
    try{
        var users = await  user.findByIdAndUpdate(req.params.id,req.body,{new:true,}).lean().exec();
        res.status(201).send(users)
    }catch(error){
        return res.status(500).json({ status: "Failed", message: error.message });
    }
    
  
  });


  app.delete("/users/:id",async (req,res)=>{
      try{
        const users = await  user.findByIdAndDelete(req.params.id).lean().exec();
        res.send(users)
      }catch(error){
        return res.status(500).json({ status: "Failed", message: error.message });
      }
   
  
  });

//make express listen to app.js
app.listen(6754, async function(){
    await connect();
    console.log("Listening on port 6754")
})