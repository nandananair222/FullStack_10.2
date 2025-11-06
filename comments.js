const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/commentController');

router.post('/', auth, ctrl.addComment);
router.delete('/:id', auth, ctrl.deleteComment);

module.exports = router;
