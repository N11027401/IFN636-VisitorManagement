const express = require('express');
const router = express.Router();
const {
  createVisitor,
  getVisitors,
  getVisitor,
  updateVisitor,
  deleteVisitor,

} = require('../controllers/visitorController');
const { protect } = require('../middleware/authMiddleware');
router.post('/checkin', createVisitor);
router.get('/', protect, getVisitors);
router.get('/:id', protect, getVisitor);
router.put('/:id', protect, updateVisitor);
router.delete('/:id', protect, deleteVisitor);

module.exports = router;
