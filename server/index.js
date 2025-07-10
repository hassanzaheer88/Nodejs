// const http = require("http");

// const myServer = http.createServer((req , res)=>{
//     //console.log("New request Received");
//     //console.log(req.headers);
//     console.log(req); //it stores information about user who does request.


//     res.end("Hello from server again:")    
// });

// myServer.listen(8000, () => console.log("Server started!"));


// ------------------- Task ----------------------------------------------
// ----- creating a log ----------

const http = require("http");
const fs = require("fs")

const myServer = http.createServer((req , res)=>{
    
    //const log = `${Date.now()}: New Request Received:\n`
    const log = `${Date.now()}:${req.url} New Request Received:\n` //to check url search by user
    fs.appendFile("log.txt",log,(err,data) => {
        switch(req.url){
            case "/":
                res.end("HomePage:")
                break;
            case "/about":
                res.end("I am Hassan Zaheer")
                break;
            default:
                res.end("404 Not Found")
        }
        
    })
      
});

// -------- port the server ----------
myServer.listen(8000, () => console.log("Server started!"));




