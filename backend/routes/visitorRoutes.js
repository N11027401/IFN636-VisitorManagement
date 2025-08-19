const express = require('express');
const router = express.Router();
const {
  createVisitor,
} = require('../controllers/visitorController');
const { protect } = require('../middleware/authMiddleware');

router.post('/checkin', createVisitor);

module.exports = router;
