import styles from './styles.module.scss';
import Image from 'next/image';
import Cat from '@/public/favorite-cat.png';

interface CardProps {
  name: string;
  image: string;
  alt: string;
  feature?: boolean;
  counter?: number;
}

const Card: React.FC<CardProps> = ({ image, alt, feature, counter, name }) => {
  if (feature) {
    return (
      <div className={styles.container_feature}>
        <div className={styles.container_content}>
          <div className={styles.container_swapper}>
            <Image src={Cat} alt="" className={styles.img_cat} />
            <p className={styles.counter}>{counter}</p>
          </div>
        </div>
        <div className={styles.overlay}>
          <p className={styles.title}>{name}</p>
        </div>
        <Image src={image} alt={alt} className={styles.img} width={250} height={330} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.overlay}>
        <p className={styles.title}>{name}</p>
      </div>
      <Image src={image} alt={alt} className={styles.img} width={250} height={330} />
    </div>
  );
};

export default Card;
