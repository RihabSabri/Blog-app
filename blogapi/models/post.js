const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: [120, "Title should be less then 120 letters"],
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      maxlength: [25, "name Too Long"],
      require: true,
    },
    category: {
      type: Array,
      required: false,
    },
    cover: {
      type: String,
      default:
        "https://th.bing.com/th/id/R.a62cf69940005047ef7993b3795ef6a6?rik=H7mANm1VHzLBpQ&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2fa%2f3%2f7%2f1521439-beautiful-geometry-wallpapers-1920x1080-full-hd.jpg&ehk=hw00sLMME00FkzO5W5dGbciK49dIzWMF8srLbgle590%3d&risl=&pid=ImgRaw&r=0",
    },
    special: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Posts", postsSchema);
