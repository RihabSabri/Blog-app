const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

router.route("/").get(getAllUsers);
router.route("/:id").patch(updateUser).get(getSingleUser).delete(deleteUser);

module.exports = router;
