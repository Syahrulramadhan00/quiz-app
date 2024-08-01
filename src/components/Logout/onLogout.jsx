import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; 

const onLogout = () => {
  const navigate = useNavigate(); 

  const onLogout = () => {
    Cookies.remove('isLoggedIn');
    Cookies.remove('username');
    navigate("/login"); 
  };

  return { onLogout };
};

export default onLogout;
