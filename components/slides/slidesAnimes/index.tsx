import styles from '../styles.module.scss';
import Card from '../../common/card';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import animes_services, { Animes } from '../../../services/animes/animes.service';

interface Props {
  color: string;
}

const SlidesAnimes: React.FC<Props> = ({ color }) => {
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
        <p className={styles.title}>Animes</p>
      </div>
      <div className={styles.container_animes}>
        {data.map((anime: Animes, index) => (
          <Link
            key={index}
            href={`/anime/${anime.name}/${anime.id}`}
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
      </div>
    </div>
  );
};

export default SlidesAnimes;
