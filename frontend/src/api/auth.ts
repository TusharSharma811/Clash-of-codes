
export const handleRegister = async (username: string, email: string, password: string): Promise<void> => {
  // const navigate = useNavigate();
  console.log(`Registering user: ${username}, Email: ${email}`);
  
  const response = await fetch('server/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });
   const data = await response.json();
  console.log(`Response status: ${response.status} ${JSON.stringify(data)}`);

  if (!response.ok) {
    
    throw new Error(data.error || 'Registration failed');
  }
  // response.ok ? navigate('/signin') : null ;
  localStorage.setItem('token', data.token);
  response.ok?window.location.href = '/' : null ;

  

  return response.json();
}


export const handleLogin = async (email: string, password: string): Promise<void> => {
  console.log(`Logging in user: ${email}`);
  
  const response = await fetch('/server/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  console.log(`Response data: ${JSON.stringify(data)}`);
  console.log(`Response status: ${response.status} ${JSON.stringify(data)}`);

  // const navigate = useNavigate();
  // response.ok ? navigate('/') : null ;
   if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Login failed');
  }
  localStorage.setItem('token', data.token);
  response.ok?window.location.href = '/' : null ;

 

  return response.json();
}