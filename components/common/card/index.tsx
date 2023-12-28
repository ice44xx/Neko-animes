import styles from './styles.module.scss';

interface CardProps {
  image: string;
  alt: string;
}

const Card: React.FC<CardProps> = ({ image, alt }) => {
  return (
    <div className={styles.container}>
      <img src={image} alt={alt} className={styles.img} />
    </div>
  );
};

export default Card;
