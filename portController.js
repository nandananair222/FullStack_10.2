const Post = require('../models/Post');
const Comment = require('../models/Comment');

exports.createPost = async (req, res) => {
  try {
    const { title, body, tags } = req.body;
    const post = new Post({ author: req.user._id, title, body, tags: tags || [] });
    await post.save();
    res.json(post);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
};

exports.getPosts = async (req, res) => {
  // simple pagination optional
  const posts = await Post.find().sort({ createdAt: -1 }).populate('author', 'username avatarUrl');
  res.json(posts);
};

exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id).populate('author', 'username avatarUrl');
  if (!post) return res.status(404).json({ message: 'No post' });
  const comments = await Comment.find({ post: post._id }).populate('author', 'username avatarUrl').sort({ createdAt: 1 });
  res.json({ post, comments });
};

exports.updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'No post' });
  if (!post.author.equals(req.user._id)) return res.status(403).json({ message: 'Unauthorized' });

  const { title, body, tags } = req.body;
  post.title = title ?? post.title;
  post.body = body ?? post.body;
  post.tags = tags ?? post.tags;
  await post.save();
  res.json(post);
};

exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'No post' });
  if (!post.author.equals(req.user._id)) return res.status(403).json({ message: 'Unauthorized' });
  await post.remove();
  // Optionally remove related comments
  await Comment.deleteMany({ post: req.params.id });
  res.json({ message: 'Deleted' });
};

exports.toggleLike = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'No post' });

  const idx = post.likes.findIndex(id => id.equals(req.user._id));
  if (idx === -1) post.likes.push(req.user._id);
  else post.likes.splice(idx, 1);
  await post.save();
  res.json({ likesCount: post.likes.length });
};
