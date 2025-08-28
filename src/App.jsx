import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Register'
import Dashboard from './pages/Dashboard'
import CapsuleDetails from './pages/CapsuleDetails'
import Home from './pages/Home'
import PrivateRoute from './components/PrivateRoute'
import Navbar from './components/Navbar'
import CreateCapsule from './pages/CreateCapsule'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={
          <PrivateRoute>
            <CreateCapsule />
          </PrivateRoute>
        } />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path='/capsule/:id' element={<CapsuleDetails />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
