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
const url = require("url")

const myServer = http.createServer((req , res)=>{
    
    //const log = `${Date.now()}: New Request Received:\n`
    const log = `${Date.now()}: ${req.method} ${req.url} New Request Received:\n` //to check url search by user
    if(req.url === "/favicon.ico") return res.end();
    const myUrl = url.parse(req.url,true);
    //console.log(myUrl);
    
    fs.appendFile("log.txt",log,(err,data) => {
        switch(myUrl.pathname){
            case "/":
               if(req.method === "GET") res.end("HomePage")
                break;
            case "/about":
                const username = myUrl.query.myname;
                res.end(`Hi , ${username}`)
                break;
            case "/search":
                const search = myUrl.query.search_query;
                res.end("Here are your results for " + search)
            case "/signup":
                if(req.method === "GET") res.end("This is a signup form");
                else if(req.method === "POST"){
                    // DB Query
                    res.end("Success")
                }
            default:
                res.end("404 Not Found")
        }
        
    })
      
});

// -------- port the server ----------
myServer.listen(8000, () => console.log("Server started!"));




