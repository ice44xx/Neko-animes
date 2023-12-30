import Image from 'next/image';
import styles from './styles.module.scss';
import Link from 'next/link';
import CopyRight from '../../../public/assets/copyright.png';
import Cat from '../../../public/assets/cat_footer.png';
import Cats from '../../../public/assets/cats_footer.png';

const Footer = () => {
  return (
    <div className={styles.container}>
      <Image src={Cat} alt="Gatinho gif" className={styles.cat_img} />
      <div className={styles.footer}>
        <div className={styles.container_info}>
          <p className={styles.desc}>
            Neko animes não hospeda nenhum vídeo em seus servidores. Todo o conteúdo é
            disponibilizado por terceiros não afiliados. <br />
          </p>
          <div className={styles.copy}>
            <Image src={CopyRight} alt="Copyright" />
            <p>2023 - Neko Animes - Todos os Direitos Reservados</p>
          </div>
        </div>
        <Image src={Cats} alt="Gatinhos" className={styles.cats_img} />
        <div className={styles.container_link}>
          <Link href={'/regras/privacidade'} className={styles.link}>
            <p className={styles.priv}>privacidade | termos</p>
          </Link>
          <Link href={'/regras/dmca'} className={styles.link}>
            <p className={styles.dmca}>DMCA</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
