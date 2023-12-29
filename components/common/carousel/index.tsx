import styles from './styles.module.scss';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import React from 'react';

interface SplideCarouselProps {
  items: React.ReactNode[];
}

const SplideCarousel: React.FC<SplideCarouselProps> = ({ items = [] }) => {
  return (
    <Splide
      className={styles.splide}
      options={{
        type: 'slide',
        perPage: 7,
        perMove: 1,
        gap: 10,
        omitEnd: true,
        focus: 'center',
        pagination: false,
      }}
    >
      {items.map((item, index) => (
        <SplideSlide key={index}>
          <div className={styles.container_slides}>{item}</div>
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default SplideCarousel;
