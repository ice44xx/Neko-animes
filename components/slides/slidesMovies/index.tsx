import styles from '../styles.module.scss';
import Card from '../../common/card';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import SplideCarousel from '../../common/carousel';
import types_service, { TypesAnimes } from '../../../services/types-animes/types.service';

interface Props {
  color: string;
}

const SlidesAnimesMovies: React.FC<Props> = ({ color }) => {
  const [data, setData] = useState<TypesAnimes[]>([]);

  useEffect(() => {
    const featchData = async () => {
      try {
        const res = await types_service.getTop10Movies('movies');
        setData(res.animes);
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
        <p className={styles.title}>Filmes</p>
      </div>
      <SplideCarousel
        items={data.map((anime: TypesAnimes, index) => (
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

export default SlidesAnimesMovies;
