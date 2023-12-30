import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

interface SplideCarouselProps {
  items: React.ReactNode[];
  perPage?: number;
  arrows?: boolean;
  customBreakpoints?: {};
  type?: string;
  gap?: number;
}

const SplideCarousel: React.FC<SplideCarouselProps> = ({
  items = [],
  perPage = 7,
  arrows = true,
  customBreakpoints = {},
  type = 'slide',
  gap = 10,
}) => {
  const breakpoints = {
    1250: { perPage: 6 },
    920: { perPage: 5 },
    650: { perPage: 4 },
    450: { perPage: 3 },
    350: { perPage: 2 },
    ...customBreakpoints,
  };
  return (
    <Splide
      options={{
        type: type,
        perPage: perPage,
        perMove: 1,
        gap: gap,
        focus: 'center',
        pagination: false,
        arrows: arrows,
        breakpoints: breakpoints,
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
