const express = require("express");
const {
  getPost,
  postPost,
  getSinglePost,
  updatePost,
  deletePost,
} = require("../controllers/post");
const router = express.Router();

router.route("/").get(getPost).post(postPost);
router.route("/:id").get(getSinglePost).patch(updatePost).delete(deletePost);
module.exports = router;
