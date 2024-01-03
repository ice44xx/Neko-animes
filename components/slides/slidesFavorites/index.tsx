import styles from '../styles.module.scss';
import Card from '../../common/card';
import Link from 'next/link';
import SplideCarousel from '../../common/carousel';
import React, { useEffect, useState } from 'react';
import favorites_services, { Favorites } from '../../../services/favorites';

interface Props {
  color: string;
}

const SlidesAnimesFavorites: React.FC<Props> = ({ color }) => {
  const [data, setData] = useState<Favorites[]>([]);

  useEffect(() => {
    const featchData = async () => {
      try {
        const res = await favorites_services.get();
        setData(Array.isArray(res) ? res : []);
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
        <p className={styles.title}>Favoritos</p>
      </div>
      <div className={styles.container_favorites}>
        {data.length === 0 ? (
          <p className={styles.error}>Não há favoritos ainda.</p>
        ) : (
          <SplideCarousel
            items={data.map((favorites: Favorites, index) => (
              <Link
                key={index}
                href={`/anime/${favorites.anime}/${favorites.id}`}
                style={{ textDecoration: 'none', color: 'white' }}
              >
                <Card
                  name={favorites.anime}
                  alt={favorites.anime}
                  image={favorites.thumbnailUrl}
                  feature={false}
                />
              </Link>
            ))}
          />
        )}
      </div>
    </div>
  );
};

export default SlidesAnimesFavorites;
