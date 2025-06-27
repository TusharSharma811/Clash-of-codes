
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router'

import Dashboard from './pages/Dashboard'
import Leaderboard from './pages/Leaderboard'
import LandingPage from './pages/Landing'

import SignIn from './pages/Signin'
import Register from './pages/Register'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />,
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
    },
    {
      path: '/leaderboard',
      element: <Leaderboard />,
    },
    {
      path: '/signin',
      element: <SignIn />,
    },
    {
      path: '/register',
      element: <Register />,
    }
  ])


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
