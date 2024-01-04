import styles from './styles.module.scss';
import Image from 'next/image';
import Cat from '@/public/favorite-cat.png';

interface CardProps {
  name: string;
  image: string;
  desc?: string;
  alt: string;
  feature?: boolean;
  classification?: boolean;
  counter?: number;
  index?: number;
}

const Card: React.FC<CardProps> = ({
  image,
  alt,
  feature,
  counter,
  name,
  classification,
  desc,
  index = 0,
}) => {
  const cardBackgrounds = [
    'cardBackgroundShounen',
    'cardBackgroundSeinen',
    'cardBackgroundShoujo',
    'cardBackgroundJosei',
    'cardBackgroundKodomo',
  ];

  const selectedBackground = cardBackgrounds[index % cardBackgrounds.length];

  const maxString = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
  };

  if (feature) {
    return (
      <div className={styles.container_feature}>
        <div className={styles.container_content}>
          <div className={styles.container_swapper}>
            <Image src={Cat} alt="Gato top 10" className={styles.img_cat} />
            <p className={styles.counter}>{counter}</p>
          </div>
        </div>
        <div className={styles.overlay}>
          <p className={styles.title}>{maxString(name, 24)}</p>
        </div>
        <Image src={image} alt={alt} className={styles.img} width={250} height={330} />
      </div>
    );
  }

  if (classification) {
    return (
      <div className={`${styles.container_classifications} ${styles[selectedBackground]}`}>
        <div className={styles.overlay}>
          <p className={`${styles.title} ${styles[selectedBackground]}`}>{maxString(name, 24)}</p>
          <p className={styles.desc}>{desc}</p>
        </div>
        <Image src={image} alt={alt} className={styles.img} width={250} height={330} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.overlay}>
        <p className={styles.title}>{maxString(name, 24)}</p>
      </div>
      <Image src={image} alt={alt} className={styles.img} width={250} height={330} />
    </div>
  );
};

export default Card;
