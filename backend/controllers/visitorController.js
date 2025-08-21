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
const getVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find({});
    res.json(visitors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);
    if (visitor) {
      res.json(visitor);
    } else {
      res.status(404).json({ message: 'Visitor not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createVisitor,
  getVisitors,
  getVisitor,
};
