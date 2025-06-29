
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router'

import Dashboard from './pages/Dashboard'
import Leaderboard from './pages/Leaderboard'
import LandingPage from './pages/Landing'

import SignIn from './pages/Signin'
import Register from './pages/Register'
import AddQuestionPage from './pages/Addquestion'
import Playgroundpage from './pages/Playground'
import Checklogin from './components/Checklogin'
import Home from './pages/Home'
import { useSocketConnect } from './Hooks/useSocketconnect'
import { useUser } from './Hooks/useUser'

function App() {

  useSocketConnect();
  useUser();

  const router = createBrowserRouter([
    {
      path: '/',
      element:<> {localStorage.getItem("token") ?<Home />: <LandingPage />}</>,
    },
    {
      path: '/dashboard',
      element: <Checklogin><Dashboard /></Checklogin>,
    },
    {
      path: '/leaderboard',
      element: <Checklogin><Leaderboard /></Checklogin>,
    },
    {
      path: '/signin',
      element: <SignIn />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path:'addquestion',
      element: <Checklogin><AddQuestionPage /></Checklogin>
    },
    {
      path: '/playground/:id',
      element: <Checklogin><Playgroundpage /></Checklogin>,
    }
  ])


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
