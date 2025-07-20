const mongoose = require("mongoose");

async function connectTomongodb(url) {
    return mongoose.connect(url);
}

 module.exports = {
    connectTomongodb,
}