import Slider from "react-slick";

import urlSlide1  from "./Images/slide1.jpg";
import urlSlide2 from "./Images/slide2.jpg";

const Banner = () => {

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 1300,
    fade: true,
    autoplay: true,
    pauseOnFocus: false,
    pauseOnHover: false,
    className: "banner-main"
  };

  return (
    <Slider {...settings}>
      <div>
        <img
          src={urlSlide1}
          alt="banner"
          className="banner-item"
        />
      </div>
      <div>
        <img
          src={urlSlide2}
          alt="banner"
          className="banner-item"
        />
      </div>
    </Slider>
  );
};

export default Banner;
