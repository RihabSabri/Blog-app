const Posts = require("../models/post");
const User = require("../models/user");

const getPost = async (req, res) => {
  const author = req.query.author;
  const category = req.query.category;
  const special = req.query.special;
  const last = req.query.last;
  try {
    let posts;
    if (author) {
      posts = await Posts.find({ author });
    } else if (category) {
      posts = await Posts.find({
        category: {
          $in: [category],
        },
      });
    } else if (special) {
      posts = await Posts.find({ special });
    } else if (last) {
      posts = await Posts.find().sort({ _id: -1 }).limit(1);
    } else {
      posts = await Posts.find();
    }
    return res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json(error);
  }
};

const postPost = async (req, res) => {
  try {
    const posts = await Posts.create(req.body);
    return res.status(201).json({ posts });
  } catch (error) {
    res.status(500).json(error);
  }
};
const getSinglePost = async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post does not exist" });
    }
    return res.status(200).json({ post });
  } catch (error) {
    res.status(500).json(error);
  }
};
const updatePost = async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (post.author === req.body.author) {
      try {
        const updatedPost = await Posts.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!post) {
          return res.status(404).json({ error: "Post does not exist" });
        }
        return res.status(200).json({ updatedPost });
      } catch (error) {
        return res.status(500).json(error);
      }
    } else {
      res.status(403).json("permission denied");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
const deletePost = async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (post.author === req.body.author) {
      try {
        const post = await Posts.findByIdAndDelete(req.params.id);
        if (!post) {
          return res.status(404).json("Post does not exist");
        }
        res.status(200).json({ post });
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      return res.status(403).json("permission denied");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getPost, postPost, updatePost, deletePost, getSinglePost };
