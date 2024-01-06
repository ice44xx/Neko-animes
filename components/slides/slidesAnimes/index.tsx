import styles from '../styles.module.scss';
import Card from '../../common/card';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import animes_services, { Animes } from '../../../services/animes/animes.service';
import ButtonComponent from '../../common/button';

interface Props {
  color: string;
}

const SlidesAnimes: React.FC<Props> = ({ color }) => {
  const itemsPerPage = 14;
  const pagesToShow = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<Animes[]>([]);

  useEffect(() => {
    const featchData = async () => {
      try {
        const res = await animes_services.get();
        setData(res);
      } catch (error: any) {
        console.log(error);
      }
    };
    featchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const maxPage = Math.min(currentPage + pagesToShow - 1, totalPages);
  const firstPage = Math.max(maxPage - pagesToShow + 1, 1);
  const pages = Array.from(
    { length: Math.min(pagesToShow, totalPages) },
    (_, index) => firstPage + index,
  );
  const showEllipsis = totalPages > maxPage;

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_bar}>
        <div className={`${styles.bar}`} style={{ backgroundColor: color }}></div>
        <p className={styles.title}>Animes</p>
      </div>
      <div className={`${styles.container_animes} mt-5 mb-5`}>
        {currentItems.map((anime: Animes, index) => (
          <Link
            key={index}
            href={`/anime/${anime.name}/${anime.id}`}
            style={{ textDecoration: 'none', color: 'white' }}
          >
            <Card
              name={anime.name}
              alt={anime.name}
              image={anime.thumbnailUrl}
              feature={false}
              counter={index + 1}
            />
          </Link>
        ))}
      </div>
      <div className={styles.pagination}>
        {data.length > itemsPerPage && (
          <>
            {pages.map((number, index) => (
              <div key={index}>
                <ButtonComponent
                  value={number}
                  onClick={() => paginate(number)}
                  className={styles.btn}
                />
                {index === pages.length - 1 && showEllipsis && <span>...</span>}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default SlidesAnimes;
