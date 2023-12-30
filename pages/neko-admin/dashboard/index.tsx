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
import Link from 'next/link';

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
    { title: 'Animes', count: animesCount, link: '/neko-admin/dashboard/animes' },
    { title: 'Usuários', count: usersCount, link: '/neko-admin/dashboard/users' },
    {
      title: 'Planos de fundos',
      count: backgroundsCount,
      link: '/neko-admin/dashboard/backgrounds',
    },
    { title: 'Categorias', count: categoriesCount, link: '/neko-admin/dashboard/categories' },
    {
      title: 'Classificações',
      count: classificationsCount,
      link: '/neko-admin/dashboard/classifications',
    },
    { title: 'Temporadas', count: seasonsCount, link: '/neko-admin/dashboard/seasons' },
    { title: 'Episódios', count: episodesCount, link: '/neko-admin/dashboard/episodes' },
    { title: 'Comentários', count: commentsCount, link: '/neko-admin/dashboard/comments' },
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
        <div className={styles.container_content}>
          <Image src={Cat} alt="Gatinho" className={styles.img} />
          <div className={styles.container_dashboard}>
            {counters.map((counter, index) => (
              <Link href={counter.link} key={index} className={styles.link}>
                <div className={styles.card}>
                  <p className={styles.count}>{counter.count}</p>
                  <p className={styles.title}>{counter.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
