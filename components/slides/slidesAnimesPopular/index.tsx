import { useEffect, useState } from 'react';
import SplideCarousel from '../../common/carousel';
import styles from '../styles.module.scss';
import animes_services, { Animes } from '../../../services/animes/animes.service';
import Card from '../../common/card';

interface Props {
  color: string;
}

const SlidesAnimesPopular: React.FC<Props> = ({ color }) => {
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
        <p className={styles.title}>Destaques do momento</p>
      </div>

      {data.length > 0 && (
        <SplideCarousel
          items={data.map((anime: Animes, index) => (
            <Card key={index} alt={anime.name} image={anime.thumbnailUrl} feature={false} />
          ))}
        />
      )}
    </div>
  );
};

export default SlidesAnimesPopular;
