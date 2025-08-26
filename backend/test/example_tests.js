//REFERENCE: This is a rework of Week 3 Tutorial Test Case modified for the Visitor Project.

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const sinon = require('sinon');
const Visitor = require('../models/Visitor');
const { updateVisitor, getVisitors, createVisitor, deleteVisitor } = require('../controllers/visitorController');
const { expect } = chai;

chai.use(chaiHttp);

describe('Visitor Controller Unit Tests', () => {

  describe('createVisitor Function Test', () => {

    afterEach(() => {
      sinon.restore();
    });

    it('should create a new visitor successfully', async () => {
      const req = {
        body: { name: "John Doe", email: "john.doe@example.com", reason: "Meeting" }
      };
      const savedVisitor = { _id: new mongoose.Types.ObjectId(), ...req.body };
      const saveStub = sinon.stub(Visitor.prototype, 'save').resolves(savedVisitor);
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      await createVisitor(req, res);

      expect(saveStub.calledOnce).to.be.true;
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(savedVisitor)).to.be.true;
    });

    it('should return 500 if an error occurs', async () => {
      const saveStub = sinon.stub(Visitor.prototype, 'save').throws(new Error('DB Error'));

      const req = {
        body: { name: "John Doe", email: "john.doe@example.com", reason: "Meeting" }
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      await createVisitor(req, res);

      expect(saveStub.calledOnce).to.be.true;
      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;
    });
  });

  describe('updateVisitor Function Test', () => {

    afterEach(() => {
      sinon.restore();
    });

    it('should update visitor successfully', async () => {
      const visitorId = new mongoose.Types.ObjectId();
      const existingVisitor = {
        _id: visitorId,
        name: "Jane Doe",
        email: "jane.doe@example.com",
        reason: "Old Reason",
        save: sinon.stub().resolvesThis(),
      };
      const findByIdStub = sinon.stub(Visitor, 'findById').resolves(existingVisitor);

      const req = {
        params: { id: visitorId },
        body: { name: "John Smith", reason: "New Reason" }
      };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis()
      };

      await updateVisitor(req, res);
      expect(findByIdStub.calledOnce).to.be.true;
      expect(existingVisitor.name).to.equal("John Smith");
      expect(existingVisitor.reason).to.equal("New Reason");
      expect(res.status.called).to.be.false; 
      expect(res.json.calledOnce).to.be.true;
    });

    it('should return 404 if visitor is not found', async () => {
      const findByIdStub = sinon.stub(Visitor, 'findById').resolves(null);

      const req = { params: { id: new mongoose.Types.ObjectId() }, body: {} };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      await updateVisitor(req, res);

      expect(findByIdStub.calledOnce).to.be.true;
      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'Visitor not found' })).to.be.true;
    });

    it('should return 500 on error', async () => {
      const findByIdStub = sinon.stub(Visitor, 'findById').throws(new Error('DB Error'));

      const req = { params: { id: new mongoose.Types.ObjectId() }, body: {} };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      await updateVisitor(req, res);

      expect(findByIdStub.calledOnce).to.be.true;
      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.called).to.be.true;
    });
  });

  describe('getVisitors Function Test', () => {

    afterEach(() => {
      sinon.restore();
    });

    it('should return all visitors', async () => {
      const visitors = [
        { _id: new mongoose.Types.ObjectId(), name: "Visitor 1" },
        { _id: new mongoose.Types.ObjectId(), name: "Visitor 2" }
      ];

      const findStub = sinon.stub(Visitor, 'find').resolves(visitors);

      const req = {}; 
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis()
      };
      await getVisitors(req, res);

      expect(findStub.calledOnceWith({})).to.be.true;
      expect(res.json.calledWith(visitors)).to.be.true;
      expect(res.status.called).to.be.false; 
    });

    it('should return 500 on error', async () => {
      const findStub = sinon.stub(Visitor, 'find').throws(new Error('DB Error'));

      const req = {};
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis()
      };

      await getVisitors(req, res);

      expect(findStub.calledOnce).to.be.true;
      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;
    });
  });

  describe('deleteVisitor Function Test', () => {

    afterEach(() => {
      sinon.restore();
    });

    it('should delete a visitor successfully', async () => {
      const req = { params: { id: new mongoose.Types.ObjectId().toString() } };

      const visitor = { remove: sinon.stub().resolves() };

      const findByIdStub = sinon.stub(Visitor, 'findById').resolves(visitor);

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      await deleteVisitor(req, res);

      expect(findByIdStub.calledOnceWith(req.params.id)).to.be.true;
      expect(visitor.remove.calledOnce).to.be.true;
      expect(res.json.calledWith({ message: 'Visitor removed' })).to.be.true;
    });

    it('should return 404 if visitor is not found', async () => {
      const findByIdStub = sinon.stub(Visitor, 'findById').resolves(null);
      const req = { params: { id: new mongoose.Types.ObjectId().toString() } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      await deleteVisitor(req, res);
      expect(findByIdStub.calledOnceWith(req.params.id)).to.be.true;
      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'Visitor not found' })).to.be.true;
    });
    it('should return 500 if an error occurs', async () => {
      const findByIdStub = sinon.stub(Visitor, 'findById').throws(new Error('DB Error'));
      const req = { params: { id: new mongoose.Types.ObjectId().toString() } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      await deleteVisitor(req, res);

      expect(findByIdStub.calledOnce).to.be.true;
      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;
    });
  });
});
