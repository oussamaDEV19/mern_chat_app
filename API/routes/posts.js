const router = require("express").Router();
const Post = require("../models/post");
const User = require("../models/User");

// create post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update post

router.put("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post.userId === req.body.userId) {
    try {
      await post.updateOne({
        $set: req.body,
      });
      res.status(200).json("Post has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your posts");
  }
});

// delete post

router.delete("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post.userId === req.body.userId) {
    try {
      await post.deleteOne();
      res.status(200).json("Post has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your posts");
  }
});

// like/unlike a post

router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      return res.status(200).json("Post has been Liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      return res.status(200).json("Post has been Unliked");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// get a post

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// get a timeline post

router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser.id });
    const freindPosts = await Promise.all(
      currentUser.followins.map((freindId) => {
        return Post.find({ userId: freindId });
      })
    );
    res.status(200).json(userPosts.concat(...freindPosts));
  } catch (err) {
    return res.status(500).json(err);
  }
});
// get a user posts

router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    
    res.status(200).json(posts)
  } catch (err) {
    return res.status(500).json(err);
  }
});


module.exports = router;
