import styles from '../../styles.module.scss';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import animes_services, { Animes } from '../../../../services/animes/animes.service';
import Link from 'next/link';
import Card from '../../../../components/common/card';
import Cat from '@/public/assets/cat_error.webp';
import Image from 'next/image';

const SearchAnime = () => {
  const router = useRouter();
  const { name } = router.query;
  const [data, setData] = useState<Animes[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await animes_services.getByName(String(name));
        setData(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [name]);

  return (
    <main>
      <div className={styles.container}>
        <p className={styles.title}>Resultado de busca por {name}</p>
        <div></div>
        <div className={styles.container_animes}>
          {data.length === 0 ? (
            <div className={styles.container_error}>
              <Image src={Cat} alt="Erro ao encontrar" className={styles.img} />
              <p className={styles.error}>Opss, Anime não encontrado.</p>
            </div>
          ) : (
            data.map((anime: Animes) => (
              <Link
                key={anime.id}
                href={`/anime/${anime.name}/${anime.id}`}
                style={{ textDecoration: 'none', color: 'white' }}
              >
                <Card
                  name={anime.name}
                  image={anime.thumbnailUrl}
                  alt={anime.name}
                  feature={false}
                />
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  );
};
export default SearchAnime;
