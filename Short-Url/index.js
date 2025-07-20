const express = require("express");
const {connectTomongodb} = require("./connect")
const urlroute = require("./routes/url");
const URL = require("./models/url")
 
const app = express();

const PORT = 8001;

connectTomongodb("mongodb://localhost:27017/short-url")
.then(()=>console.log("mongo db is connected"))

app.use(express.json())

app.use("/test" , (req,res) => {
    return res.end("<h1>Hey from server </h1>")
})

app.use("/url" , urlroute)

app.get( "/:shortId" , async (req,res) => {
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