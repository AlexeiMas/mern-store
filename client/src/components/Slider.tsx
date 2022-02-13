import React from 'react';
import {Carousel} from "react-bootstrap"

const Slider = () => {
  const sliderItems = [1,2,3,4,5]

  return (
    <Carousel
      variant={"dark"}
      prevIcon={<span aria-hidden="true" />}
      nextIcon={<span aria-hidden="true" />}
    >
      {sliderItems.map(item =>
        <Carousel.Item key={item}>
          <img
            height={620}
            className="d-block w-100"
            src={`/assets/slider/${item}.jpg`}
            alt={`${item} slide`}
          />
        </Carousel.Item>
      )}
    </Carousel>
  );
};

export default Slider;
