
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
  
const Checklogin = ({children} : {children : React.ReactNode}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/signin');
    }
  }, [navigate]);

  if (!localStorage.getItem('token')) {
    return null;
  }

  return (
    <div>
        {children}
        {/* If token exists, render children, otherwise redirect to signin */}
    </div>
  )
}

export default Checklogin