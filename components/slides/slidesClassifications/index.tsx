import styles from '../styles.module.scss';
import classifications_service, {
  Classifications,
} from '../../../services/classifications/classifications.service';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Card from '../../common/card';
import SplideCarousel from '../../common/carousel';

interface Props {
  color: string;
}

const Classifications: React.FC<Props> = ({ color }) => {
  const [data, setData] = useState<Classifications[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const classifications = await classifications_service.get();
        setData(classifications);
        console.log(classifications);
      } catch (error: any) {
        console.error(error.message);
      }
    }
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.container_bar}>
        <div className={`${styles.bar}`} style={{ backgroundColor: color }}></div>
        <p className={styles.title}>Classificações</p>
      </div>

      <SplideCarousel
        perPage={5}
        customBreakpoints={{
          1250: { perPage: 5 },
          920: { perPage: 4 },
          650: { perPage: 3 },
          450: { perPage: 2 },
          350: { perPage: 2 },
        }}
        items={data.map((classification: Classifications, index) => (
          <div className={styles.container_classification}>
            <Link
              href={`/animes/classificacao/${classification.name}`}
              key={index}
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <Card
                index={index}
                name={classification.name}
                desc={classification.desc}
                alt={classification.name}
                image={classification.thumbnail}
                classification={true}
                feature={false}
              />
            </Link>
          </div>
        ))}
      />
    </div>
  );
};

export default Classifications;
