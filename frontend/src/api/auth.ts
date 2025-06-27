import { useNavigate } from "react-router";

export const handleRegister = async (username: string, email: string, password: string): Promise<void> => {
  // const navigate = useNavigate();
  console.log(`Registering user: ${username}, Email: ${email}`);
  
  const response = await fetch('/server/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });
  console.log(`Response status: ${response.status} ${await response.json()}`);

  // response.ok ? navigate('/signin') : null ;
  response.ok?window.location.href = '/' : null ;

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Registration failed');
  }

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
  console.log(`Response status: ${response.status} ${await response.json()}`);

  // const navigate = useNavigate();
  // response.ok ? navigate('/') : null ;
  response.ok?window.location.href = '/' : null ;

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Login failed');
  }

  return response.json();
}