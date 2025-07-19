const express = require("express");

const router = express.Router();
const {handleGetAllUsers,
  handlegetUserbyid,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateUser
} = require("../controllers/user")




router.route("/").get(handleGetAllUsers).post(handleCreateUser);

router
  .route("/:id")
  .get(handlegetUserbyid)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);


module.exports = router;

