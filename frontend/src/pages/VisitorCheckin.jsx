import { useState } from 'react'
import axiosInstance from '../axiosConfig'

function VisitorCheckin() {
  const [formData, setFormData] = useState({ name: '', email: '', reason: '' })
  const [visitor, setVisitor] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axiosInstance.post('/api/visitors/checkin', formData)
      setVisitor(res.data)
      setFormData({ name: '', email: '', reason: '' })
    } catch (err) {
      console.log('Error:', err)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Visitor Check-in</h1>
      <form onSubmit={handleSubmit} className="p-4 border rounded">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full mb-2 p-2 border"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full mb-2 p-2 border"
        />
        <input
          type="text"
          placeholder="Reason"
          value={formData.reason}
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          className="w-full mb-2 p-2 border"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2">
          Check-in
        </button>
      </form>

      {visitor && (
        <div className="mt-6 p-4 border rounded">
          <h2 className="font-bold">Badge</h2>
          <p>Name: {visitor.name}</p>
          <p>Time: {new Date(visitor.checkinTime).toLocaleString()}</p>
        </div>
      )}
    </div>
  )
}

export default VisitorCheckin
