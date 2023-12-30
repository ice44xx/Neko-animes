import { useEffect, useState } from 'react';
import styles from '../styles.module.scss';
import backgrounds_service, {
  Backgrounds,
} from '../../../services/backgrounds/backgrounds.service';
import Image from 'next/image';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import CategoriesBar from '../../common/categories';

const SlidesBackgrounds = () => {
  const [data, setData] = useState<Backgrounds[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await backgrounds_service.get();
        setData(res);
        console.log(res);
      } catch (error: any) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <Splide
          options={{
            type: 'loop',
            perPage: 1,
            perMove: 1,
            pagination: false,
            arrows: false,
            autoplay: true,
            interval: 5000,
          }}
        >
          {data.map((background: Backgrounds) => (
            <SplideSlide key={background.id}>
              <div className={styles.container_backgrounds}>
                <Image
                  src={background.url}
                  alt="Animes Backgrounds"
                  width={1980}
                  height={500}
                  className={styles.backgrounds}
                />
                <div className={styles.smoke}></div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
        <div className={styles.container_categories}>
          <CategoriesBar />
        </div>
      </div>
    </>
  );
};

export default SlidesBackgrounds;
