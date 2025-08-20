import { useState } from 'react';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const PasswordPrompt = ({ onSuccess, onCancel }) => {
  const [password, setPassword] = useState('');
  const { user, login } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/auth/login', { 
        email: user.email, 
        password 
      });
      login(response.data);
      onSuccess();
    } catch {
      alert('Incorrect password. Please try again.');
    }
  };
  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>Enter Password to Continue</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
          <div style={actionsStyle}>
            <button type="button" onClick={onCancel} style={{ ...buttonStyle, background: '#6c757d' }}>
              Cancel
            </button>
            <button type="submit" style={{ ...buttonStyle, background: '#007bff' }}>
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

const modalStyle = {
  background: '#fff',
  padding: '1.5rem',
  borderRadius: '6px',
  width: '300px',
  textAlign: 'center'
};

const inputStyle = {
  width: '100%',
  padding: '0.5rem',
  marginBottom: '1rem',
  border: '1px solid #ccc',
  borderRadius: '4px'
};
const actionsStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '0.5rem'
};
const buttonStyle = {
  padding: '0.5rem 1rem',
  border: 'none',
  borderRadius: '4px',
  color: '#fff',
  cursor: 'pointer'
};
export default PasswordPrompt;
