import styles from '../styles.module.scss';
import Card from '../../common/card';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import animes_services, { Animes } from '../../../services/animes/animes.service';
import SplideCarousel from '../../common/carousel';

interface Props {
  color: string;
}

const SlidesAnimesNewest: React.FC<Props> = ({ color }) => {
  const [data, setData] = useState<Animes[]>([]);

  useEffect(() => {
    const featchData = async () => {
      try {
        const res = await animes_services.getTop10Newest();
        setData(res);
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
      <SplideCarousel
        items={data.map((anime: Animes, index) => (
          <Link
            key={index}
            href={`/anime/${anime.name}/${anime.id}`}
            style={{ textDecoration: 'none', color: 'white' }}
          >
            <Card name={anime.name} alt={anime.name} image={anime.thumbnailUrl} feature={false} />
          </Link>
        ))}
      />
    </div>
  );
};

export default SlidesAnimesNewest;
