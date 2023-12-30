import styles from '../../styles.module.scss';
import Link from 'next/link';
import Card from '../../../../components/common/card';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import classifications_service, {
  ClassificationsAnimes,
} from '../../../../services/classifications/classifications.service';

const ClassificationsPage = () => {
  const router = useRouter();
  const { name } = router.query;
  const [data, setData] = useState<ClassificationsAnimes[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await classifications_service.getByName(String(name));
        setData(res.animes || []);
        console.log(data);
      } catch (error: any) {
        console.error(error.message);
      }
    }
    fetchData();
  }, [name]);

  return (
    <main>
      <div className={styles.container}>
        <p className={styles.title}>Classificação {name}</p>
        <div className={styles.container_animes}>
          {data.map((anime: ClassificationsAnimes) => (
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
              ></Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};
export default ClassificationsPage;
