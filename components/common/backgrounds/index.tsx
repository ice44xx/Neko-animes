import styles from './styles.module.scss';
import Image from 'next/image';

interface Props {
  background: string | undefined;
}

const BackgroundsAnimes: React.FC<Props> = ({ background }) => {
  return (
    <div className={styles.container}>
      <div className={styles.container_backgrounds}>
        <div className={styles.smoke}></div>
        {background && (
          <Image
            src={background}
            alt="Animes Backgrounds"
            width={1980}
            height={500}
            className={styles.backgrounds}
          />
        )}
        <div className={styles.smoke}></div>
      </div>
    </div>
  );
};
export default BackgroundsAnimes;
