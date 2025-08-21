const express = require('express');
const router = express.Router();
const {
  createVisitor,
  getVisitors,
} = require('../controllers/visitorController');
const { protect } = require('../middleware/authMiddleware');
router.post('/checkin', createVisitor);
router.get('/', protect, getVisitors);
module.exports = router;
