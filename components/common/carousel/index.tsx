import styles from './styles.module.scss';
import Card from '../card';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

interface SlidesProps {
  images: string[];
}

const SplideCarousel: React.FC<SlidesProps> = ({ images }) => {
  return (
    <Splide
      className={styles.Splide}
      options={{
        type: 'slide',
        perPage: 7,
        perMove: 1,
        gap: 10,
        omitEnd: true,
        pagination: false,
      }}
    >
      {images.map((imageUrl: any, index: number) => (
        <SplideSlide key={index} className={styles.SplideSlide}>
          <Card image={imageUrl} alt={`Image ${index + 1}`} />
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default SplideCarousel;
