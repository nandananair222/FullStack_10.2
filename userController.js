const User = require('../models/User');

exports.getProfile = async (req, res) => {
  // req.user is set by auth middleware
  res.json(req.user);
};

exports.updateProfile = async (req, res) => {
  try {
    const updates = (({ bio, avatarUrl }) => ({ bio, avatarUrl }))(req.body);
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
