import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import slide1 from '../assets/1.jpg';
import slide2 from '../assets/2.jpg';
import slide3 from '../assets/3.jpg';

function UncontrolledExample() {
  return (
    <div className="carousel-container" style={{marginTop:"20px"}}>
    <Carousel>
      <Carousel.Item>
      <img src={slide1} alt="First slide" />
        <Carousel.Caption>
          <h3>Schenke her, statt wegzuwerfen</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={slide2} alt="Second slide" />
        <Carousel.Caption>
          <h3>Finde alles Mögliche</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={slide3} alt="Third slide" />
        <Carousel.Caption>
          <h3>Nachhaltigkeit liegt uns am Herzen</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  );
}

export default UncontrolledExample;     