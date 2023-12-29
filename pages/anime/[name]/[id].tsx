import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import animes_services, { Animes } from '../../../services/animes/animes.service';

const Anime = () => {
  const router = useRouter();
  const [data, setData] = useState<Animes>();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await animes_services.getById(Number(id));
        setData(res);
        console.log(res);
      } catch (error: any) {
        console.log(error);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <main>
      <div className={styles.container}>
        {data && (
          <div>
            <p>ID: {data.id}</p>
            <p>Name: {data.name}</p>
          </div>
        )}
      </div>
    </main>
  );
};
export default Anime;
