import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import categories_service, { Categories } from '../../../services/categories/categories.service';
import SplideCarousel from '../carousel';
import Link from 'next/link';

const CategoriesBar = () => {
  const [data, setData] = useState<Categories[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await categories_service.get();
        setData(res);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <SplideCarousel
      arrows={false}
      perPage={12}
      items={data.map((category: Categories, index) => (
        <div key={index} className={styles.container}>
          <Link href={`/anime/categorias/${category.name}`} style={{ textDecoration: 'none' }}>
            <div className={styles.container_categories}>
              <p className={styles.title}>{category.name.toLocaleUpperCase()}</p>
            </div>
          </Link>
        </div>
      ))}
    />
  );
};
export default CategoriesBar;
