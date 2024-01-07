import styles from './styles.module.scss';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Arrow from '@/public/assets/arrowBtn.png';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import episodes_service, { EpisodesGet } from '../../../../../services/episodes/episodes.service';
import animes_services, { AnimesGet } from '../../../../../services/animes/animes.service';

const EpisodePage = () => {
  const router = useRouter();
  const { animeId, id, name } = router.query;
  const [episode, setEpisode] = useState<EpisodesGet>();
  const [anime, setAnime] = useState<AnimesGet>();
  const [seasonVisibility, setSeasonVisibility] = useState<boolean[]>([]);

  useEffect(() => {
    const fetchDataEpisode = async () => {
      try {
        const res = await episodes_service.getById(Number(id));
        setEpisode(res);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchDataSeason = async () => {
      try {
        const res = await animes_services.getById(Number(animeId));
        setAnime(res);

        if (res && res.seasons && res.seasons.length > 0) {
          const initialVisibility = new Array(res.seasons.length).fill(false);
          initialVisibility[0] = true;
          setSeasonVisibility(initialVisibility);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (animeId && id) {
      fetchDataSeason();
      fetchDataEpisode();
    }
  }, [animeId, id]);

  const toggleSeasonVisibility = (index: number) => {
    setSeasonVisibility((prevVisibility) =>
      prevVisibility.map((visibility, i) => (i === index ? !visibility : visibility)),
    );
  };

  return (
    <>
      <Head>
        <title>Neko Animes - {name}</title>
      </Head>
      <main>
        <div className={styles.container}>
          <div className={styles.container_video}>
            {episode?.url && (
              <iframe
                src={episode.url}
                title={episode.name}
                allowFullScreen
                className={styles.container_content_video}
              >
                Seu navegador não suporta o elemento de vídeo.
              </iframe>
            )}
          </div>
          <div className={styles.container_content_seasons}>
            {anime?.seasons.map((season, index) => (
              <div key={index} className={styles.container_swapper_seasons}>
                <div className={styles.container_title}>
                  <p className={styles.title}>{season.name.slice(0, 11)}</p>
                  {seasonVisibility[index] ? (
                    <Image
                      onClick={() => toggleSeasonVisibility(index)}
                      src={Arrow}
                      alt="mostrar temporada"
                      className={styles.arrow_down}
                    />
                  ) : (
                    <Image
                      onClick={() => toggleSeasonVisibility(index)}
                      src={Arrow}
                      alt="Ocultar temporada"
                      className={styles.arrow_up}
                    />
                  )}
                </div>
                {seasonVisibility[index] && (
                  <div className={styles.container_episodes}>
                    {season.episodes.map((episode, index) => (
                      <div key={index}>
                        <div className={styles.episodes}>
                          <Link
                            href={`/episodio/${encodeURIComponent(
                              anime.name,
                            )}/${animeId}/${encodeURIComponent(episode.name)}/${encodeURIComponent(
                              episode.id,
                            )}`}
                            className={styles.episode_name}
                          >
                            {episode.name}
                          </Link>
                          <Image
                            src={anime.thumbnailUrl}
                            alt={episode.name}
                            fill
                            className={styles.thumbnail}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default EpisodePage;
