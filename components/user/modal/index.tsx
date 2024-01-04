import styles from './styles.module.scss';
import animes_services from '../../../services/animes/animes.service';
import Image from 'next/image';
import User from '@/public/modal/user.webp';
import Random from '@/public/modal/random.webp';
import Order from '@/public/modal/order.webp';
import Loggout from '@/public/modal/logout.webp';
import Donates from '@/public/modal/donates.webp';
import { useRouter } from 'next/router';

interface Props {
  active: boolean;
}

const Modal: React.FC<Props> = ({ active }) => {
  const router = useRouter();

  const handleChangedDate = () => {
    router.push('/usuario/dados');
  };

  const fetchData = async () => {
    try {
      const res = await animes_services.get();
      const randomIndex = Math.floor(Math.random() * res.length);
      const randomAnime = res[randomIndex];
      return randomAnime;
    } catch (error) {
      console.log(error);
    }
  };

  const handleAnimeRandom = async () => {
    const randomAnime = await fetchData();
    router.push(`/anime/${randomAnime.name}/${randomAnime.id}`);
  };

  const handleDonations = () => {
    router.push('/neko/doacoes');
  };

  const handleLoggout = () => {
    sessionStorage.clear();
    if (router.pathname === '/') {
      window.location.reload();
    } else {
      router.push('/');
      router.reload();
    }
  };

  return (
    <div className={`${styles.container} ${active ? styles.active : ''}`}>
      <div className={styles.container_content}>
        <div className={styles.container_swapper} onClick={handleChangedDate}>
          <Image src={User} alt="Dados do usuário" width={20} height={20} className={styles.img} />
          <p className={styles.title}>Dados</p>
        </div>
        <div className={styles.container_swapper} onClick={handleAnimeRandom}>
          <Image src={Random} alt="Anime aleatório" width={20} height={20} className={styles.img} />
          <p className={styles.title}>Anime</p>
        </div>
        <div className={styles.container_swapper} onClick={handleDonations}>
          <Image
            src={Order}
            alt="Pedidos de Animes"
            width={20}
            height={20}
            className={styles.img}
          />
          <p className={styles.title}>Pedidos</p>
        </div>
        <div className={styles.container_swapper} onClick={handleDonations}>
          <Image
            src={Donates}
            alt="Doações Neko Animes"
            width={20}
            height={20}
            className={styles.img}
          />
          <p className={styles.title}>Doações</p>
        </div>
        <div className={styles.container_swapper} onClick={handleLoggout}>
          <Image src={Loggout} alt="Deslogar" width={20} height={20} className={styles.img} />
          <p className={styles.title}>Sair</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
