

import React, { useState, useEffect } from 'react';
import './SlideShow.css'; // Import your CSS file
import feed1 from './pics/feed1.webp';
import feed2 from './pics/feed2.webp';
import feed3 from './pics/feed3.webp';
import feed4 from './pics/feed4.jpg';


const SlideShow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [feed1, feed2, feed3,feed4]; // Replace image URLs with imported images

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const goToPreviousSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    const intervalId = setInterval(goToNextSlide, 5000);
    return () => clearInterval(intervalId);
  }, [currentIndex, images]);

  return (<>
    <br/>

    <div className="slideshow-container">
      {images.map((image, index) => (
        <div key={index} className={index === currentIndex ? 'slide active' : 'slide'}>
          <img src={image} alt={`Slide ${index}`} className="slideshow-image" />
          <h2 className="slideshow-text"><b>QUALITY PRODUCT WITH MULTI COLOR</b></h2>
        </div>
      ))}
      <button className="prev-btn" onClick={goToPreviousSlide}>{'<'}</button>
      <button className="next-btn" onClick={goToNextSlide}>{'>'}</button>
    </div>
    <br/>
    </>
  );
};

export default SlideShow;


