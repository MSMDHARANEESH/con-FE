import React from "react";

import Navbar from "./Components/Navbar";
import SlideShow from "./Components/Slider/SlideShow";
import Products from "./Pages/Products";
import Footer from "./Footer";
import AboutUs from "./About";

export const Home = () => {
  return (
    <>
    <Navbar/>
    <SlideShow/>
    <Products/>
    <AboutUs/>
    <Footer/>
    </>
  )
}
