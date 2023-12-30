import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

interface SplideCarouselProps {
  items: React.ReactNode[];
  perPage?: number;
  arrows?: boolean;
}

const SplideCarousel: React.FC<SplideCarouselProps> = ({
  items = [],
  perPage = 7,
  arrows = true,
}) => {
  return (
    <Splide
      options={{
        type: 'slide',
        perPage: perPage,
        perMove: 1,
        gap: 10,
        focus: 'center',
        pagination: false,
        arrows: arrows,
        breakpoints: {
          1250: {
            perPage: 6,
          },
          920: {
            perPage: 5,
          },
          650: {
            perPage: 4,
          },
          450: {
            perPage: 3,
          },
          350: {
            perPage: 2,
          },
        },
      }}
    >
      {items.map((item, index) => (
        <SplideSlide className={'mt-5 mb-5'} key={index}>
          {item}
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default SplideCarousel;
