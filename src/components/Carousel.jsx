// Remove the unused import statement for React
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Carousel() {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true
  };
  return (
    <div className="slider">
    <div className="slider-container">
      <Slider {...settings}>
        <div className ="slider-item">
          <h3>1</h3>
        </div>
        <div className ="slider-item">
          <h3>2</h3>
        </div>
        <div className ="slider-item">
          <h3>3</h3>
        </div>
        <div className ="slider-item">
          <h3>4</h3>
        </div>
        <div className ="slider-item">
          <h3>5</h3>
        </div>
        <div className ="slider-item">
          <h3>6</h3>
        </div>
      </Slider>
    </div>
    </div>
  );
}

export default Carousel;