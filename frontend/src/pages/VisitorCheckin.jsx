import { useState } from 'react'
import axiosInstance from '../axiosConfig'

function VisitorCheckin() {
  const [formData, setFormData] = useState({ name: '', email: '', reason: '' })
  const [visitor, setVisitor] = useState(null)
  const [showBadge, setShowBadge] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axiosInstance.post('/api/visitors/checkin', formData)
      setVisitor(res.data)
      setShowBadge(true)
      setFormData({ name: '', email: '', reason: '' })
    } catch (err) {
      alert('Check-in failed. Please try again.')
    }
  }

  const handleCloseBadge = () => {
    setShowBadge(false)
    setVisitor(null)
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4 text-center">Visitor Check-in</h1>
      <form onSubmit={handleSubmit} className="p-4 border rounded bg-white shadow">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Reason for visit"
          value={formData.reason}
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          className="w-full mb-3 p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Check-in
        </button>
      </form>

      {showBadge && visitor && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Badge Preview</h2>
            <p><span className="font-semibold">Name:</span> {visitor.name}</p>
            <p><span className="font-semibold">Check-in Time:</span> {new Date(visitor.checkinTime).toLocaleString()}</p>
            <button
              onClick={handleCloseBadge}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default VisitorCheckin
