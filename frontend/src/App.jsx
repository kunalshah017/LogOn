import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Home from './components/Home'
import MainPage from './components/MainPage'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

function App() {

  const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/sign-in', element: <SignIn /> },
    { path: '/sign-up', element: <SignUp /> },
    { path: '*', element: <div>Not Found</div> },
    { path: '/main', element: <MainPage /> },

  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App