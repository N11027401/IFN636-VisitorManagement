import { useNavigate } from 'react-router-dom';
import PasswordPrompt from '../components/PasswordPrompt';
const Reauth = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/admin');
  };
  return <PasswordPrompt onSuccess={handleSuccess} />;
};

export default Reauth;
