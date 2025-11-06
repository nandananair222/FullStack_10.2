const Comment = require('../models/Comment');
const Post = require('../models/Post');

exports.addComment = async (req, res) => {
  const { postId, text } = req.body;
  const post = await Post.findById(postId);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  const comment = new Comment({ post: postId, author: req.user._id, text });
  await comment.save();
  const populated = await comment.populate('author', 'username avatarUrl').execPopulate();
  res.json(populated);
};

exports.deleteComment = async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) return res.status(404).json({ message: 'No comment' });
  if (!comment.author.equals(req.user._id)) return res.status(403).json({ message: 'Unauthorized' });
  await comment.remove();
  res.json({ message: 'Deleted' });
};
