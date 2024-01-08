import styles from './styles.module.scss';
import Link from 'next/link';
import Head from 'next/head';
import BackgroundsAnimes from '../../../components/common/backgrounds';
import Image from 'next/image';
import Fav from '@/public/assets/favorite.png';
import FavConfirmed from '@/public/assets/favorite_confirmed.png';
import Like from '@/public/assets/like.png';
import LikeConfirmed from '@/public/assets/heart.png';
import SeasonsList from '../../../components/common/seasons';
import animes_services, { AnimesGet } from '../../../services/animes/animes.service';
import favorites_services, { Favorites } from '../../../services/favorites';
import likes_services, { Likes } from '../../../services/likes/likes.service';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { EpisodesGet } from '../../../services/episodes/episodes.service';

const Anime = () => {
  const router = useRouter();
  const [likes, setLikes] = useState(false);
  const [favorites, setFavorites] = useState(false);
  const [loggin, setLoggin] = useState(false);
  const [data, setData] = useState<AnimesGet>();

  const { id, name } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await animes_services.getById(Number(id));
        setData(res);
      } catch (error: any) {
        console.log(error);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    const token = sessionStorage.getItem('nekoanimes-token');
    if (token) {
      setLoggin(true);
    }

    const loadFavorites = async () => {
      const favoritesList = await favorites_services.get();
      if (Array.isArray(favoritesList)) {
        const isFavoriteTrue = favoritesList.some(
          (anime: Favorites) => anime.animeId === Number(id) && anime.favorite === true,
        );
        setFavorites(isFavoriteTrue);
      }
    };
    const loadLikes = async () => {
      const likesList = await likes_services.get();
      if (Array.isArray(likesList)) {
        const isLikeTrue = likesList.some(
          (anime: Likes) => anime.animeId === Number(id) && anime.like === true,
        );
        setLikes(isLikeTrue);
      }
    };
    loadLikes();
    loadFavorites();
  }, []);

  const handleFavorite = async () => {
    await favorites_services.create(Number(id));
    setFavorites(true);
    if (favorites === true) {
      await favorites_services.delete(Number(id));
      setFavorites(false);
    }
  };

  const handleLike = async () => {
    await likes_services.create(Number(id));
    setLikes(true);
    if (likes === true) {
      await likes_services.delete(Number(id));
      setLikes(false);
    }
  };

  function firstUpper(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  const handleEpisodeClick = (selectedEpisode: EpisodesGet) => {
    router.push(
      `/episodio/${selectedEpisode.name}/${selectedEpisode.id}/${name}/${id}`,
      undefined,
      { shallow: true },
    );
  };

  return (
    <>
      <Head>
        <title>Neko Animes - {name}</title>
      </Head>
      <BackgroundsAnimes background={data?.background} />
      <main>
        <div className={styles.container}>
          <div className={styles.container_content_info}>
            {data && (
              <>
                <div className={styles.container_card}>
                  <Image src={data.thumbnailUrl} alt={data.name} fill className={styles.card} />
                </div>
                <div className={styles.container_info}>
                  <p className={styles.title}>{data.name}</p>
                  <p className={styles.desc}>{data.synopsis}</p>
                  <div className={styles.container_categories_classification}>
                    <Link
                      href={`/animes/classificacao/${data.classifications.name}`}
                      className={styles.categories}
                    >
                      {firstUpper(data.classifications.name)}
                    </Link>

                    {data.categories.map((category, index) => (
                      <Link
                        href={`/animes/categorias/${category.name}`}
                        key={index}
                        className={styles.categories}
                      >
                        {firstUpper(category.name)}
                      </Link>
                    ))}
                  </div>
                  <div className={styles.container_seasons}>
                    <p className={styles.seasons}>Temporadas: {data.seasons.length}</p>
                  </div>
                  <div className={styles.container_logic}>
                    {loggin ? (
                      <div className={styles.container_like_fav}>
                        {likes ? (
                          <Image
                            onClick={handleLike}
                            src={LikeConfirmed}
                            alt="Curtir anime"
                            className={styles.icon}
                          />
                        ) : (
                          <Image
                            onClick={handleLike}
                            src={Like}
                            alt="Curtir anime"
                            className={styles.icon}
                          />
                        )}
                        {favorites ? (
                          <Image
                            onClick={handleFavorite}
                            src={FavConfirmed}
                            alt="Anime favoritado"
                            className={styles.icon}
                          />
                        ) : (
                          <Image
                            onClick={handleFavorite}
                            src={Fav}
                            alt="Favoritar anime"
                            className={styles.icon}
                          />
                        )}
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
          <SeasonsList id={Number(id)} handleEpisodeClick={handleEpisodeClick} />
        </div>
      </main>
    </>
  );
};
export default Anime;
