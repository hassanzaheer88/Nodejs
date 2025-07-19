
const User = require("../models/user")


async function handleGetAllUsers(req,res) {
    const alldbusers = await User.find({});

  return res.json(alldbusers); 
}

async function handlegetUserbyid(req,res) {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json( { error: "user not found " })
    return res.json(user);
}

async function handleUpdateUserById(req,res) {
    await User.findByIdAndUpdate(req.params.id , {last_name: "changed"})
    return res.json({ status: "success" });
}
async function handleDeleteUserById(req,res) {
    await User.findByIdAndDelete(req.params.id)
    return res.json({ status: "success" });
}
async function handleCreateUser(req,res) {
    const body = req.body;

  if(!body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title ){
    return res.status(400).json( { msg:"all fields are required... "});
  }
  const result = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
    job_title: body.job_title, 
  });

  return res.status(201).json({ msg: "success" , id: result._id });

}


module.exports = {
    handleGetAllUsers,
    handlegetUserbyid,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateUser,
}





