const express = require('express');
const router = express.Router();
const {
  createVisitor,
  getVisitors,
  getVisitor,
  updateVisitor,
} = require('../controllers/visitorController');
const { protect } = require('../middleware/authMiddleware');
router.post('/checkin', createVisitor);
router.get('/', protect, getVisitors);
router.put('/:id', protect, updateVisitor);

module.exports = router;
