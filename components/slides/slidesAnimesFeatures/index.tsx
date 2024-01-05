import styles from '../styles.module.scss';
import SplideCarousel from '../../common/carousel';
import Card from '../../common/card';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import animes_services, { Animes } from '../../../services/animes/animes.service';

interface Props {
  color: string;
}

const SlidesAnimesFeatures: React.FC<Props> = ({ color }) => {
  const [data, setData] = useState<Animes[]>([]);

  useEffect(() => {
    const featchData = async () => {
      try {
        const res = await animes_services.getTop10Features();
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
        <p className={styles.title}>Destaques</p>
      </div>
      <SplideCarousel
        items={data.map((anime: Animes, index) => (
          <Link
            href={`/anime/${anime.name}/${anime.id}`}
            key={index}
            style={{ textDecoration: 'none', color: 'white' }}
          >
            <Card
              name={anime.name}
              alt={anime.name}
              image={anime.thumbnailUrl}
              feature={true}
              counter={index + 1}
            />
          </Link>
        ))}
      />
    </div>
  );
};

export default SlidesAnimesFeatures;
