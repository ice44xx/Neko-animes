import styles from '../styles.module.scss';
import Link from 'next/link';
import SplideCarousel from '../../common/carousel';
import { useEffect, useState } from 'react';
import categories_service, { Categories } from '../../../services/categories/categories.service';

const SlidesCategories = () => {
  const [data, setData] = useState<Categories[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await categories_service.get();
        setData(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <SplideCarousel
      arrows={false}
      perPage={22}
      gap={120}
      type="loop"
      customBreakpoints={{
        1250: { perPage: 22 },
        920: { perPage: 22 },
        650: { perPage: 22 },
        450: { perPage: 22, gap: 100 },
        350: { perPage: 22 },
      }}
      items={data.map((category: Categories, index) => (
        <div key={index} className={styles.container_categories_content}>
          <Link href={`/animes/categorias/${category.name}`} style={{ textDecoration: 'none' }}>
            <div className={styles.container_categories_swapper}>
              <p className={styles.title}>{category.name.toLocaleUpperCase()}</p>
            </div>
          </Link>
        </div>
      ))}
    />
  );
};
export default SlidesCategories;
