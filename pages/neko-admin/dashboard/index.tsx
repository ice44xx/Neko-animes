import { useEffect, useState } from 'react';
import { UserInfo } from '../../../services/auth/auth.service';
import styles from './styles.module.scss';
import Head from 'next/head';
import animes_services from '../../../services/animes/animes.service';
import users_service from '../../../services/users/users.service';
import backgrounds_service from '../../../services/backgrounds/backgrounds.service';
import categories_service from '../../../services/categories/categories.service';
import classifications_service from '../../../services/classifications/classifications.service';
import seasons_service from '../../../services/seasons/seasons.service';
import episodes_service from '../../../services/episodes/episodes.service';
import Image from 'next/image';
import Cat from '@/public/assets/catid.png';

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [animesCount, setAnimesCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [backgroundsCount, setBackgroundsCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [classificationsCount, setClassificationsCount] = useState(0);
  const [seasonsCount, setSeasonsCount] = useState(0);
  const [episodesCount, setEpisodesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);

  const counters = [
    { title: 'Animes', count: animesCount },
    { title: 'Usuários', count: usersCount },
    { title: 'Planos de fundos', count: backgroundsCount },
    { title: 'Categorias', count: categoriesCount },
    { title: 'Classificações', count: classificationsCount },
    { title: 'Temporadas', count: seasonsCount },
    { title: 'Episódios', count: episodesCount },
    { title: 'Comentários', count: episodesCount },
  ];

  useEffect(() => {
    const featchCounts = async () => {
      try {
        const animes = await animes_services.get();
        const users = await users_service.getAdmin();
        const backgrounds = await backgrounds_service.get();
        const categories = await categories_service.get();
        const classifications = await classifications_service.get();
        const seasons = await seasons_service.get();
        const episodes = await episodes_service.get();

        setAnimesCount(animes.length);
        setUsersCount(users.length);
        setBackgroundsCount(backgrounds.length);
        setCategoriesCount(categories.length);
        setClassificationsCount(classifications.length);
        setSeasonsCount(seasons.length);
        setEpisodesCount(episodes.length);

        const userInfoFromStorage = sessionStorage.getItem('userInfo');
        if (userInfoFromStorage) {
          setUserInfo(JSON.parse(userInfoFromStorage));
        }
      } catch (error) {
        console.error('Erro ao buscar contadores:', error);
      }
    };
    featchCounts();
  }, []);

  return (
    <main>
      <Head>
        <title>Neko Admin</title>
      </Head>
      <div className={styles.container}>
        {userInfo?.userName ? (
          <p className={styles.welcome}>{`Bem-vindo ${userInfo?.userName} !`}</p>
        ) : (
          <p className={styles.welcome}>{'Bem-vindo'}</p>
        )}
        <div className={styles.container_content}>
          <Image src={Cat} alt="Gatinho" className={styles.img} />
          <div className={styles.container_dashboard}>
            {counters.map((counter, index) => (
              <div key={index} className={styles.card}>
                <p className={styles.count}>{counter.count}</p>
                <p className={styles.title}>{counter.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
