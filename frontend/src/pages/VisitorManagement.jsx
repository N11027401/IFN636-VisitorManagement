import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';

const VisitorManagement = () => {
  const [visitors, setVisitors] = useState([]);
  const [editingVisitor, setEditingVisitor] = useState(null);

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const response = await axiosInstance.get('/api/visitors');
        setVisitors(response.data);
      } catch (error) {
        alert('Failed to fetch visitors.');
      }
    };
    fetchVisitors();
  }, []);


  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/api/visitors/${editingVisitor._id}`, editingVisitor);
      setVisitors(visitors.map((v) => (v._id === editingVisitor._id ? editingVisitor : v)));
      setEditingVisitor(null);
    } catch (error) {
      alert('Failed to update visitor.');
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Visitor Management</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Reason</th>
            <th className="py-2 px-4 border-b">Check-in Time</th>
          </tr>
        </thead>
        <tbody>
          {visitors.map((visitor) => (
            <tr key={visitor._id}>
              <td className="py-2 px-4 border-b">{visitor.name}</td>
              <td className="py-2 px-4 border-b">{visitor.email}</td>
              <td className="py-2 px-4 border-b">{visitor.reason}</td>
              <td className="py-2 px-4 border-b">{new Date(visitor.checkinTime).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingVisitor && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Edit Visitor</h2>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                value={editingVisitor.name}
                onChange={(e) => setEditingVisitor({ ...editingVisitor, name: e.target.value })}
                className="w-full mb-4 p-2 border rounded"
              />
              <input
                type="email"
                value={editingVisitor.email}
                onChange={(e) => setEditingVisitor({ ...editingVisitor, email: e.target.value })}
                className="w-full mb-4 p-2 border rounded"
              />
              <input
                type="text"
                value={editingVisitor.reason}
                onChange={(e) => setEditingVisitor({ ...editingVisitor, reason: e.target.value })}
                className="w-full mb-4 p-2 border rounded"
              />
              <input
                type="datetime-local"
                value={new Date(editingVisitor.checkinTime).toISOString().slice(0, 16)}
                onChange={(e) => setEditingVisitor({ ...editingVisitor, checkinTime: e.target.value })}
                className="w-full mb-4 p-2 border rounded"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setEditingVisitor(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitorManagement;
