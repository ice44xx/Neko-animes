import styles from './styles.module.scss';
import classifications_service, {
  Classifications,
} from '../../services/classifications/classifications.service';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
      <div className={styles.container_content}>
        {data.map((classification: Classifications, index) => (
          <Link href={`/classificação/${classification.name}`} className={styles.link} key={index}>
            <div className={`${styles.card} ${cardBackgrounds[index]}`}>
              <Image
                src={classification?.thumbnail}
                alt={classification?.name}
                className={styles.img}
                width={280}
                height={350}
              />
              <p className={styles.title}>{classification?.name}</p>
              <p className={styles.desc}>{classification.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Classifications;
