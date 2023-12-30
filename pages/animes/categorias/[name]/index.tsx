import styles from '../../styles.module.scss';
import Link from 'next/link';
import Card from '../../../../components/common/card';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import categories_service, {
  CategoriesAnimes,
} from '../../../../services/categories/categories.service';

const CategoriesPage = () => {
  const router = useRouter();
  const { name } = router.query;
  const [data, setData] = useState<CategoriesAnimes[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await categories_service.getByName(String(name));
        setData(res.animes || []);
        console.log(res);
      } catch (error: any) {
        console.log(error);
      }
    };
    if (name) {
      fetchData();
    }
  }, [name]);

  return (
    <main>
      <div className={styles.container}>
        <p className={styles.title}>Categoria {name}</p>
        <div className={styles.container_animes}>
          {data.map((anime: CategoriesAnimes) => (
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
export default CategoriesPage;
