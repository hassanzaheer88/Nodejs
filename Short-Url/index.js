const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser')
const {connectTomongodb} = require("./connect")

//const {restrictToLoggedinUserOnly,checkAuth} = require("./middlewares/auth")
const {checkForAuthentication,restrictTo} = require("./middlewares/auth")

const URL = require("./models/url")

const urlroute = require("./routes/url");
const staticRoute = require("./routes/staticRouter")
const userRoute = require("./routes/user")

 
const app = express();

const PORT = 8001;

connectTomongodb("mongodb://localhost:27017/short-url")
.then(()=>console.log("mongo db is connected"))

//-------- to use ejs we will do this --------
app.set("view engine" ,"ejs");
app.set("views" , path.resolve("./views") );

app.use(express.json())
app.use(express.urlencoded( {extended: false }))
app.use(cookieParser());
app.use(checkForAuthentication);



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

app.use("/url" ,restrictTo(["NORMAL"],["ADMIN"]), urlroute)
app.use( "/user" , userRoute)
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