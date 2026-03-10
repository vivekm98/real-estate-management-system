import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './components/Register'
import AuthProvider from './components/AuthProvider'
import PublicRoute from './components/PublicRoute'
import Login from './components/Login'
import PrivateRoute from './components/PrivateRoute'
import User from './components/User'
import AdminRoute from './components/AdminRoute'
import AdminDashboard from './components/AdminDashboard'
import AddCategory from './components/AddCategory'
import CategoryList from './components/CategoryList'
import EditCategory from './components/EditCategory'
import AddProperty from './components/AddProperty'
import PropertyList from './components/PropertyList'
import EditProperty from './components/EditProperty'
import UserDashboard from './components/UserDashboard'
import PropertyDetails from './components/PropertyDetails'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <AuthProvider>
     <BrowserRouter>
      <Header />
       <Routes>

        
        <Route path="/register" element ={<PublicRoute><Register/></PublicRoute> } />
        <Route path="/login" element ={<PublicRoute><Login/></PublicRoute> } />
        <Route path="/admin" element ={<PrivateRoute > <AdminRoute><AdminDashboard /> </AdminRoute> </PrivateRoute> } />
        <Route path="/user" element ={<PrivateRoute ><User/> </PrivateRoute> } />
        <Route path="/user-dashboard" element ={<PrivateRoute ><UserDashboard/> </PrivateRoute> } />
        <Route path="/user/property/:id" element ={<PrivateRoute ><PropertyDetails/> </PrivateRoute> } />
        <Route path='/admin/add-category' element= {<PrivateRoute><AdminRoute><AddCategory /> </AdminRoute> </PrivateRoute>} />
        <Route path='/admin/list-category' element= {<PrivateRoute><AdminRoute><CategoryList /> </AdminRoute> </PrivateRoute>} />
        <Route path='/admin/edit-category/:id' element= {<PrivateRoute><AdminRoute><EditCategory /> </AdminRoute> </PrivateRoute>} />
        <Route path='/admin/add-property' element= {<PrivateRoute><AdminRoute><AddProperty /> </AdminRoute> </PrivateRoute>} />
        <Route path='/admin/list-property' element= {<PrivateRoute><AdminRoute><PropertyList /> </AdminRoute> </PrivateRoute>} />
        <Route path='/admin/edit-property:id' element= {<PrivateRoute><AdminRoute><EditProperty /> </AdminRoute> </PrivateRoute>} />

       </Routes>
     </BrowserRouter>
     </AuthProvider>

    </>
  )
}

export default App
