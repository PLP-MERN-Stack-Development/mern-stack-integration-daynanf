const Post = require('../models/Post');

// Create post (protected)
const createPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const post = await Post.create({
      title, content, author: req.user._id, image, tags: tags ? tags.split(',').map(t => t.trim()) : []
    });
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not create post' });
  }
};

// Read posts (with pagination)
const getPosts = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 10);
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .populate('author', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments();
    res.json({ posts, meta: { total, page, limit } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not fetch posts' });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name email');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update (only author)
const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    if (!post.author.equals(req.user._id)) return res.status(403).json({ message: 'Forbidden' });

    const { title, content, tags } = req.body;
    if (req.file) post.image = `/uploads/${req.file.filename}`;
    if (title) post.title = title;
    if (content) post.content = content;
    if (tags) post.tags = tags.split(',').map(t => t.trim());

    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not update' });
  }
};

// Delete (only author)
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    if (!post.author.equals(req.user._id)) return res.status(403).json({ message: 'Forbidden' });

    await post.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not delete' });
  }
};

// Add comment
const addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });

    post.comments.push({ author: req.user._id, text: req.body.text });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not add comment' });
  }
};

module.exports = { createPost, getPosts, getPostById, updatePost, deletePost, addComment };
