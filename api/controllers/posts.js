const Post = require('../models/Post');
const User = require('../models/User');

exports.createPost = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const post = await Post.findById(id);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json('The post has been updated..');
    } else {
      res.status(403).json('You can only update your Posts');
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const post = await Post.findById(id);
    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json('The post has been deleted..');
    } else {
      res.status(403).json('You can only update your Posts');
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.likePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const post = await Post.findById(id);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json('The post has been liked');
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json('The post has been unliked');
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (post) {
      res.status(200).send(post);
    } else {
      res.status(404).json('There is no Post with this id');
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getTimelinePosts = async (req, res) => {
  const { userId } = req.params;

  try {
    const currentUser = await User.findById(userId);
    const userPosts = await Post.find({ userId: currentUser._id }).sort({
      createdAt: -1,
    }); // sort by createdAt in descending order
    const followingsPosts = await Promise.all(
      currentUser.followings.map((followingId) => {
        return Post.find({ userId: followingId }).sort({ createdAt: -1 }); // sort by createdAt in descending order
      })
    );
    res
      .status(200)
      .json(
        [...userPosts, ...followingsPosts.flat()].sort(
          (a, b) => b.createdAt - a.createdAt
        )
      ); // sort by createdAt in descending order
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getAllUserPosts = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (user) {
      const posts = await Post.find({ userId: user._id }).sort({
        createdAt: -1,
      });
      res.status(200).json(posts);
    } else {
      res.status(404).json('There is no User with this username');
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
