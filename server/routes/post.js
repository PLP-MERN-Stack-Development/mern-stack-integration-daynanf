const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const postController = require('../controllers/postController');

router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);
router.post('/', auth, upload.single('image'), postController.createPost);
router.put('/:id', auth, upload.single('image'), postController.updatePost);
router.delete('/:id', auth, postController.deletePost);
router.post('/:id/comments', auth, postController.addComment);

module.exports = router;
