import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PasswordInput from '../../components/Input/PasswordInput';
import { validateEmail } from '../../utils/helper';
import { users } from "../../components/users/users";
import Cookies from 'js-cookie'; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password.");
      return;
    }


    const user = users.find(user => user.email === email);

    if (user && user.password === password) {
      setError("");

      Cookies.set('isLoggedIn', 'true', { expires: 1 }); 
      Cookies.set('username', user.username, { expires: 1 });

      navigate('/dashboard');
    } else {
      setError("Invalid email or password.");
    }
  };

  return ( 
    <>
      <div className='flex items-center justify-center min-h-screen'>
        <div className='w-96 border rounded bg-white px-7 py-10'>
            <form onSubmit={handleLogin}>
                <h4 className='text-2xl mb-7'>Login Quiz</h4>
                
                <input 
                  type="text" 
                  placeholder='Email' 
                  className='input-box'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                
                <PasswordInput 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

                <button type='submit' className='btn-primary'>
                  Login
                </button>
                <p className='text-sm text-center mt-4'>
                Please log in using your email and password.
                </p>
            </form>
        </div>
      </div>
    </>
  );
};

export default Login;
