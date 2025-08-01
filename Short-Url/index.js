const express = require("express");
const path = require("path");
const {connectTomongodb} = require("./connect")
const urlroute = require("./routes/url");
const staticRoute = require("./routes/staticRouter")
const URL = require("./models/url")
 
const app = express();

const PORT = 8001;

connectTomongodb("mongodb://localhost:27017/short-url")
.then(()=>console.log("mongo db is connected"))

//-------- to use ejs we will do this --------
app.set("view engine" ,"ejs");
app.set("views" , path.resolve("./views") );

app.use(express.json())
app.use(express.urlencoded( {extended: false }))



// app.get("/test" , async(req,res) => {
//     const allUrls = await URL.find({});
//     return res.render("home" , {
//         urls: allUrls,
//     })
// });


//------- server side renderening -- not good mehtod------ 
// app.get("/test" , async(req,res) => {
//     const allUrls = await URL.find({});
//     return res.end( `
//             <html>
//             <head></head>
//             <body>
//                 <ol>
//                 ${allUrls.map( (url)=> `<li> ${url.shortId}- ${url.redirectUrl} - ${url.visitHistory.length}  </li>`)} 
//                 </ol>
//             </body>
//             </html>
//         `)
// })

app.use("/url" , urlroute)

app.use( "/" , staticRoute)


app.get( "/url/:shortId" , async (req,res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate( {
        shortId,
    }, 
    {
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            },
        },
    },
    );
    res.redirect(entry.redirectUrl);
});



app.listen(PORT , ()=> { console.log(`Server started at PORT: ${PORT}`)} )