const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.updateUser = async (req, res) => {
  const { id } = req.params;

  if (req.body.userId === id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        // genrate hashed password
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        res.status(500).json(error);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).json('Account has been updated');
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    return res.status(403).json('You can update only your account');
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  if (req.body.userId === id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(id);
      res.status(200).json('Account has been deleted');
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    return res.status(403).json('You can delete only your account');
  }
};

exports.getUser = async (req, res) => {
  const { userId, username } = req.query;

  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username });

    const { password, updatedAt, ...other } = user._doc;

    res.status(200).json(other);
  } catch (error) {
    return res.status(403).json('No user found');
  }
};

exports.getFriends = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    const frindes = await Promise.all(
      user.followings.map((followerId) => User.findById(followerId))
    );

    const frindesList = frindes.map(({ _id, username, profilePicture }) => ({
      _id,
      username,
      profilePicture,
    }));

    res.status(200).json(frindesList);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.putFollow = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (userId !== id) {
    try {
      const user = await User.findById(id);
      const currentUser = await User.findById(userId);

      if (!user.followers.includes(userId)) {
        await user.updateOne({ $push: { followers: userId } });
        await currentUser.updateOne({ $push: { followings: id } });

        res.status(200).json('User has been followed');
      } else {
        res.status(403).json('You already follow this user');
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json('You can not follow yourselfe');
  }
};

exports.putUnfollow = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (userId !== id) {
    try {
      const user = await User.findById(id);
      const currentUser = await User.findById(userId);

      if (user.followers.includes(userId)) {
        await user.updateOne({ $pull: { followers: userId } });
        await currentUser.updateOne({ $pull: { followings: id } });

        res.status(200).json('User has been unfollowed');
      } else {
        res.status(403).json('You do not follow this user');
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json('You can not unfollow yourselfe');
  }
};
