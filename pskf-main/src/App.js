import React from 'react'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Navbar from './Components/Navbar'
import Signin from './Pages/Auth/Signin'
import Signup from './Pages/Auth/Signup'
import Products from './Pages/Products'
import Error404 from './Pages/Error404'
import Container from './Components/Container'
import ProductDetail from './Pages/ProductDetail'
import Cart from './Pages/Cart'
import Favorites from './Pages/Favorites'
import Buy from './Pages/Buy'
import Footer from './Footer'
import Pay from './Pages/Cart/Pay'

import Admin from './Pages/Admin/Admin'
import SlideShow from './Components/Slider/SlideShow'
import AboutUs from './About'
import { Home } from './Home'
function App() {
  return (
    <div className="container mx-auto">
     
    
     
    
      
      <Container>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/:category_id" element={<Home/>} />
          <Route path="/product/:product_id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/Pay" element={<Pay />} />
          <Route path="*" element={<Error404 />} />
          <Route path="/admin" element={<Admin/>} />
        </Routes>
      </Container>
      
  

    </div>
  )
}

export default App
