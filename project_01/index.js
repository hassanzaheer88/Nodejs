const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
//const users = require("./MOCK_DATA.json");
const { json } = require("stream/consumers");
const { error } = require("console");
const { type } = require("os");

const app = express();

const port = 8000;

// Connection
mongoose.connect("mongodb://127.0.0.1:27017/youtube-app-1")
.then( ()=> console.log("Mongodb Connected"))
.catch( (err)=> console.log("Mongo Error" , err))

// Schema
const userSchema = new mongoose.Schema({
  first_name:{
    type:String,
    require:true
  },
  last_name:{
    type:String,
  },
  email:{
    type:String,
    require:true,
    unique:true,
  },
  job_title:{
    type:String,
  },
  gender:{
    type:String,
    
  },
}, {timestamps: true}
)

const User = mongoose.model('user' , userSchema)

// Middleware -> Plugin
app.use(express.urlencoded({ extended: false })); //first this middleware will be execute.

app.use((req, res, next) => {
  //console.log("Hello from middle ware 1");
  // return res.json({msg: "Hello from middle ware 1"})
  fs.appendFile(
    "log.txt",
    ` \n ${Date.now()}: ${req.ip}: ${req.method}: ${req.path} `,
    (err, data) => {
      next(); // to call the next function
    }
  );
});

// app.use( (req, res, next) => {
//     console.log("Hello from middle ware 2");
//     // return res.end("Hey")
//     next();
// });

// Routes

app.get("/users", async(req, res) => {
  const alldbusers = await User.find({});
  const html = `
   <ul>
    ${alldbusers.map((user) => `<li> ${user.first_name} - ${user.email} </li>`).join("")}
    </ul>
   `;
  res.send(html);
});

// Rest APIS

app.get("/api/users", (req, res) => {
    res.setHeader("X-myname" , "piyush garg")   //custom header
// always add "X" to custom header.
  return res.json(users);
});

// app.get('/api/users/:id' , (req,res)=>{
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.json(user);
// })

// app.patch('/api/users/:id' , (req,res)=>{
//     // TODO: Edit the user with id
//     return res.json({ status: "pending" })
// })

// app.delete('/api/users/:id' , (req,res)=>{
//     // TODO: Delete the user with id
//     return res.json({ status: "pending" })
// })

// ------- Best way to write above code -------

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if(!user) return res.status(404).json( { error: "user not found " })
    return res.json(user);
  })
  .patch((req, res) => {
    // TODO: Edit the user with id
    return res.json({ status: "pending" });
  })
  .delete(() => {
    // TODO: Delete the user with id
    return res.json({ status: "pending" });
  });

app.post("/api/users", async(req, res) => {
  //     // TODO: create new user
  const body = req.body;
  // console.log('Body:' , body);

  if(!body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title ){
    return res.status(400).json( { msg:"all fields are required... "});
  }

  // users.push({ ...body, id: users.length + 1 });
  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
  //   return res.status(201).json({ status: "success", id: users.length });
  // });

  // using mongodb we will del this push method

  const result = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
    job_title: body.job_title, 
  });

  //console.log("result:", result);
  
  return res.status(201).json({ msg: "success"});

});

app.listen(port, () => console.log("Server started at port 8000"));
