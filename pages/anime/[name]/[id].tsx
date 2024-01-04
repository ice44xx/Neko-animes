import styles from './styles.module.scss';
import BackgroundsAnimes from '../../../components/common/backgrounds';
import Image from 'next/image';
import Fav from '@/public/assets/favorite.png';
import FavConfirmed from '@/public/assets/favorite_confirmed.png';
import Like from '@/public/assets/like.png';
import LikeConfirmed from '@/public/assets/heart.png';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import animes_services, { AnimesGet } from '../../../services/animes/animes.service';
import Link from 'next/link';
import favorites_services, { Favorites } from '../../../services/favorites';
import likes_services, { Likes } from '../../../services/likes/likes.service';

const Anime = () => {
  const router = useRouter();
  const [likes, setLikes] = useState(false);
  const [favorites, setFavorites] = useState(false);
  const [loggin, setLoggin] = useState(false);
  const [data, setData] = useState<AnimesGet>();
  const { id } = router.query;

  useEffect(() => {
    const token = sessionStorage.getItem('nekoanimes-token');
    if (token) {
      setLoggin(true);
    }

    const fetchData = async () => {
      try {
        const res = await animes_services.getById(Number(id));
        setData(res);
        console.log(res);
      } catch (error: any) {
        console.log(error);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    const loadFavorites = async () => {
      const favoritesList = await favorites_services.get();
      const isFavoriteTrue = favoritesList.some(
        (anime: Favorites) => anime.animeId === Number(id) && anime.favorite === true,
      );
      setFavorites(isFavoriteTrue);
    };
    loadFavorites();
  }, []);

  useEffect(() => {
    const loadLikes = async () => {
      const likesList = await likes_services.get();
      const isLikeTrue = likesList.some(
        (anime: Likes) => anime.animeId === Number(id) && anime.like === true,
      );
      setLikes(isLikeTrue);
    };
    loadLikes();
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

  return (
    <>
      <BackgroundsAnimes background={data?.background} />
      <main>
        <div className={styles.container}>
          <div className={styles.container_content_info}>
            {data && (
              <div className={styles.container_card}>
                <Image src={data.thumbnailUrl} alt={data.name} fill className={styles.card} />
              </div>
            )}
            {data && (
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
            )}
          </div>
          <div className={styles.container_content_seasons}>
            {data?.seasons.map((season, index) => (
              <div key={index} className={styles.container_swapper_seasons}>
                <p className={styles.title}>{firstUpper(season.name).slice(0, 11)}</p>
                <div className={styles.container_episodes}>
                  {season.episodes.map((episode, index) => (
                    <div key={index}>
                      <div className={styles.episodes}>
                        <Link
                          href={`/episodio/${encodeURIComponent(
                            data.name,
                          )}/${id}/${encodeURIComponent(episode.name)}/${encodeURIComponent(
                            episode.id,
                          )}`}
                          className={styles.episode_name}
                        >
                          {episode.name}
                        </Link>
                        <Image
                          src={data.thumbnailUrl}
                          alt={episode.name}
                          fill
                          className={styles.thumbnail}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};
export default Anime;
