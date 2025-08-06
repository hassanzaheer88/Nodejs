const {getUser} = require("../service/auth")

function checkForAuthentication(req, res, next) {
     const tokenCookie = req.cookies?.token;
     req.user = null;
     if(!tokenCookie)
        return next();

     const token = tokenCookie;
     const user = getUser(token);
     req.user = user;
     return next();
}

// for particular users like for admin or for student.
function restrictTo(roles=[]){ //roles is an array.
    return function(req,res,next){
        if(!req.user) return res.redirect("/login"); //for reject he request.

        if(!roles.includes(req.user.role)) return res.end("UnAuthorized");
        return next();
    }
}




// --------- the above code is a clean code for the below whole code -----------

// async function restrictToLoggedinUserOnly(req,res,next) {
//     //const userUid = req.cookies?.uid;
//     const userUid = req.headers['Authorization'];
//     if(!userUid) return res.redirect("/login");

//     const token = userUid.split("Bearer ")[1] // "Bearer 346783ryuy8123y89"
//     const user = getUser(token);

//     //const user = getUser(userUid);
//     if(!user) return res.redirect("/login");

//     req.user = user;
//     next(); 

// }


// async function checkAuth(req,res,next) {
//     //const userUid = req.cookies?.uid;
//     const userUid = req.headers['authorization'];
//     const token = userUid.split("Bearer ")[1] // "Bearer 346783ryuy8123y89"
//     const user = getUser(token);
//     //const user = getUser(userUid);
    
//     req.user = user;
//     next(); 
// }




module.exports = {
    // restrictToLoggedinUserOnly,
    // checkAuth,
    checkForAuthentication,
    restrictTo
}




