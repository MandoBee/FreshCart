import React from "react";
import Slider from "react-slick";
import slider1 from "./../../assets/images/slider-image-1.jpeg";
import slider2 from "./../../assets/images/slider-image-2.jpeg";
import slider3 from "./../../assets/images/slider-image-3.jpeg";
import grocery1 from "./../../assets/images/grocery-banner.png";
import grocery2 from "./../../assets/images/grocery-banner-2.jpeg";


export default function HomeSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };
  return (
    <div className="slider-container my-2 flex flex-wrap">
      <Slider className="w-3/4"{...settings}>
        <div>
          <img src={slider1} className="w-full h-[300px]" ></img>
        </div>
        <div>
        <img src={slider2} className="w-full h-[300px]" ></img>
        </div>
        <div>
        <img src={slider3} className="w-full h-[300px]" ></img>
        </div>
      </Slider>
      <div className="w-1/4">
        <div className="h-1/2">
          <img src={grocery1} className="w-full h-[150px]" ></img>
          <img src={grocery2} className="w-full h-[150px]" ></img>
        </div>

      </div>

    </div>
  );
}

 