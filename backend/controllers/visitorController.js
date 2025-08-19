const Visitor = require('../models/Visitor');

const createVisitor = async (req, res) => {
  try {
    const { name, email, reason } = req.body;
    const newVisitor = new Visitor({
      name,
      email,
      reason,
    });
    const savedVisitor = await newVisitor.save();
    res.status(201).json(savedVisitor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  createVisitor,
};
