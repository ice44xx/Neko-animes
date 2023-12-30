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

  const cardBackgrounds = [
    styles.cardBackgroundShounen,
    styles.cardBackgroundSeinen,
    styles.cardBackgroundShoujo,
    styles.cardBackgroundJosei,
    styles.cardBackgroundKodomo,
  ];

  return (
    <div className={styles.container}>
      <div className={styles.container_bar}>
        <div className={`${styles.bar}`} style={{ backgroundColor: color }}></div>
        <p className={styles.title}>Classificações</p>
      </div>

      <SplideCarousel
        perPage={5}
        items={data.map((classification: Classifications, index) => (
          <Link
            href={`/classificação/${classification.name}/${classification.id}`}
            key={index}
            style={{ textDecoration: 'none', color: 'white' }}
          >
            <div className={styles.container_classification}>
              <Card
                name={classification.name}
                alt={classification.name}
                image={classification.thumbnail}
                feature={false}
              />
            </div>
          </Link>
        ))}
      />
    </div>
  );
};

export default Classifications;
