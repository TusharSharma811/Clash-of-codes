
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Leaderboard from './pages/Leaderboard'
import LandingPage from './pages/Landing'
import AuthPage from './pages/Auth'

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
      path: '/auth',
      element: <AuthPage />,
    }
  ])


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
