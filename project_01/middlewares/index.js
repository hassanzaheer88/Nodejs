const fs = require("fs");


function logReqRes(filename){
    return (req, res,next) => {
        fs.appendFile(
            filename,
            ` \n ${Date.now()}: ${req.ip}: ${req.method}: ${req.path} `,
            (err, data) => {
              next(); // to call the next function
            }
          );
    }
}

module.exports = {
    logReqRes,
}