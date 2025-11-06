const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/postController');

router.post('/', auth, ctrl.createPost);
router.get('/', ctrl.getPosts);
router.get('/:id', ctrl.getPost);
router.put('/:id', auth, ctrl.updatePost);
router.delete('/:id', auth, ctrl.deletePost);
router.post('/:id/like', auth, ctrl.toggleLike);

module.exports = router;
