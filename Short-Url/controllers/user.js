const { v4: uuidv4 } = require('uuid');
const User = require("../models/users")
const {setUser} = require("../service/auth")

async function handleUserSignup(req,res) {
    const { name,email,password } = req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/");
}

async function handleUserlogin(req,res) {
    const { email,password } = req.body;
    const user  = await User.findOne({email,password});
    if(!user)
        return res.render("login" , {
            error:"Invalid username or password"
    });

    const sessionid = uuidv4();
    setUser(sessionid,user);
    res.cookie('uid' ,sessionid);
    return res.redirect("/");
}


module.exports = {
    handleUserSignup,
    handleUserlogin,
}

