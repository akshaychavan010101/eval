const express = require("express");
const { authenticator } = require("../middlewares/authenticator.middleware");
const { PostModel } = require("../model/posts.model");

const PostRouter = express.Router();

PostRouter.use(express.json());
PostRouter.use(authenticator);

PostRouter.get("/posts", (req, res) => {
  const id = req.headers.id;
  try {
    const posts = PostModel.find({ userid: id });
    res.send(posts);
  } catch (error) {
    res.send({msg:"Error" , Error:error.message});
  }
});

PostRouter.get("/posts/top", (req, res) => {
  try {
  } catch (error) {}
});

PostRouter.post("/post/create", async (req, res) => {
    try {
    const new_post = new PostModel(req.body);
    await new_post.save();
    res.send({ msg: "Post Created" });
  } catch (error) {
    res.send({ msg: "Server Error" });
  }
});
PostRouter.patch("/posts/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await PostModel.findByIdAndUpdate({ _id: id }, req.body);
    res.send({ msg: "Post Updated" });
  } catch (error) {
    res.send({ msg: "Server Error" });
  }
});

PostRouter.delete("/posts/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await PostModel.findByIdAndDelete({ _id: id });
    res.send({ msg: "Post Deleted" });
  } catch (error) {
    res.send({ msg: "Server Error" });
  }
});

module.exports = { PostRouter };
