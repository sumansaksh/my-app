const express = require("express");
const app = express();
const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect("mongodb://127.0.0.1:27017/liabrary");
};

const sectionSchema = new mongoose.Schema(
    {
      section_name: { type: String, required: true },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );

  const Section = mongoose.model("section", sectionSchema);
  app.use(express.json());

                       //section post 
       app.post("/section", async(req,res)=>{
            try{
               const section  =  await Section.create(req.body);
                return res.status(200).send(section);
            }catch(e){
                          return res.status(500).json({ status: "Failed", message: e.message });
            }
 
        });



//author schema


     const authorSchema = new mongoose.Schema(
    {
      author_name: { type: String, required: true },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );

  const Author = mongoose.model("author", authorSchema);
                       //section post 
       app.post("/author", async(req,res)=>{
        try{
            const author =  await Author.create(req.body);
               return res.status(200).send(author);
        }catch(e){
                 return res.status(500).json({ status: "Failed", message: e.message });
        }
    
});   

//books sceema
const bookSchema = new mongoose.Schema(
    {
      book_name: { type: String, required: true },
      body:{ type:String, required:false },

      author_id:[{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "author",
        required: true,
      }],

      section_id:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "section",
        required: true,
      },

      check_id:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "check",
        required: true,
      },

    },
    {
      versionKey: false,
      timestamps: true,
    }
  );

  const book = mongoose.model("book", bookSchema);
  app.use(express.json());

                       //section post 
       app.post("/books", async(req,res)=>{
            try{
               const Book  =  await book.create(req.body);
                return res.status(200).send(Book);
            }catch(e){
               return res.status(500).json({ status: "Failed", message: e.message });
            }
 
        });


///////////////////////////////////////////////////////checkout//////////////////////////////////////

const checkSchema = new mongoose.Schema(
    {
      check_status: { type: Boolean, required: true },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );
  const Check = mongoose.model("check", checkSchema);
  app.post("/check",async (req,res)=>{
    try{
        const check  =  await Check.create(req.body);
        return res.status(200).send(check);
    }catch(e){
        return res.status(500).json({ status: "Failed", message: e.message });
    }  
  })

  //////////////////////GET////////////////////
  //app.get("/")
  app.get("/books",async (req,res)=>{
    try{
        const Book  = await book.find().populate("author_id").populate("section_id").populate("check_id").lean().exec();
        
        return res.status(200).send(Book);
        
    }catch(e){
        return res.status(500).json({ status: "Failed", message: e.message });
    }  
  })

//book of a auther
  app.get("/books/:id",async (req,res)=>{
    try{
        const Book  = await book.findById(req.params.id).lean().exec();
        
        return res.status(200).send(Book);
        
    }catch(e){
        return res.status(500).json({ status: "Failed", message: e.message });
    }  
  })


  //book of a perticular author
  app.get("/book/:id",async (req,res)=>{
    try{
        const Book  = await book.find({ author_id: req.params.id }).lean().exec();
        
        return res.status(200).send(Book);
        
    }catch(e){
        return res.status(500).json({ status: "Failed", message: e.message });
    }  
  })


  ///checked out
  app.get("/checked/:id",async (req,res)=>{
    try{
        const Book  = await book.find({ check_id: req.params.id }).populate("check_id").lean().exec();
        
        return res.status(200).send(Book);
        
    }catch(e){
        return res.status(500).json({ status: "Failed", message: e.message });
    }  
  })

//book by author
  app.get("/author/:id",async (req,res)=>{
    try{
        const Book  = await book.find({ author_id: req.params.id }).populate("check_id").lean().exec();
        
        return res.status(200).send(Book);
        
    }catch(e){
        return res.status(500).json({ status: "Failed", message: e.message });
    }  
  })

 
  

app.listen(8764, async () => {
    await connect();
    console.log("listening on port 8764");
  });