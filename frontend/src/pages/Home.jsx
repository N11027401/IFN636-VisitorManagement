import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/checkin');
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  return null;
};

export default Home;
