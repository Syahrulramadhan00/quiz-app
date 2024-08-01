import React from 'react';
import ProfileInfo from '../Cards/ProfileInfo.jsx';
import useLogout from '../Logout/onLogout.jsx'; 

const Navbar = () => {
  const { onLogout } = useLogout();

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
      <h2 className='text-xl font-medium text-black py-2'>Quiz</h2>
      <ProfileInfo onLogout={onLogout} />
    </div>
  );
};

export default Navbar;