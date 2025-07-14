const express = require("express");
const fs = require("fs")
const users = require("./MOCK_DATA.json");
const { json } = require("stream/consumers");


const app = express();

const port =8000;

// Middleware -> Plugin 
app.use(express.urlencoded({ extended:false }));

// Routes

app.get('/users' , (req,res)=>{
   const html = `
   <ul>
    ${users.map((user)=>`<li> ${user.first_name} </li>`).join("")}
    </ul>
   `;
   res.send(html);
})

// Rest APIS


// app.get('/api/users' , (req,res)=>{
//     return res.json(users);
// })

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

app.route("/api/users/:id")
.get((req,res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
})
.patch((req,res) => {
    // TODO: Edit the user with id
    return res.json({ status: "pending"})
})
.delete(() => {
    // TODO: Delete the user with id
    return res.json({ status: "pending" })
});

app.post('/api/users' , (req,res)=>{
//     // TODO: create new user
    const body = req.body;
    // console.log('Body:' , body);
    users.push({...body, id: users.length + 1 });
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users), (err,data) => {
    return res.json({ status: "success" , id: users.length })
    
    } )
    
    
})

app.listen(port, ()=>console.log("Server started at port 8000"))

