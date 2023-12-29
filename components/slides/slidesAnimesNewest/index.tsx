import React, { useEffect, useState } from 'react';
import styles from '../styles.module.scss';
import animes_services, { Animes } from '../../../services/animes/animes.service';

import SplideCarousel from '../../common/carousel';
import Card from '../../common/card';

interface Props {
  color: string;
}

const SlidesAnimesNewest: React.FC<Props> = ({ color }) => {
  const [data, setData] = useState<Animes[]>([]);

  useEffect(() => {
    const featchData = async () => {
      try {
        const res = await animes_services.get();
        setData(res);
        console.log(res);
      } catch (error: any) {
        console.log(error);
      }
    };
    featchData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.container_bar}>
        <div className={`${styles.bar}`} style={{ backgroundColor: color }}></div>
        <p className={styles.title}>Animes Lançamentos</p>
      </div>

      {data.length > 0 && (
        <SplideCarousel
          items={data.map((anime: Animes, index) => (
            <div className={styles.contaienr_slide}>
              <Card key={index} alt={anime.name} image={anime.thumbnailUrl} feature={false} />
            </div>
          ))}
        />
      )}
    </div>
  );
};

export default SlidesAnimesNewest;
