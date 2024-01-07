import styles from './styles.module.scss';
import Head from 'next/head';
import Arrow from '@/public/assets/arrowBtn.png';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import episodes_service, { EpisodesGet } from '../../../../../services/episodes/episodes.service';
import ButtonComponent from '../../../../../components/common/button';
import Image from 'next/image';
import SeasonsList from '../../../../../components/common/seasons';

const EpisodePage = () => {
  const router = useRouter();
  const { id, episodeId, anime, name } = router.query;
  const [episode, setEpisode] = useState<EpisodesGet>();
  const [episodeList, setEpisodeList] = useState<EpisodesGet[]>([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState<number>(
    episodeId ? Number(episodeId) : 0,
  );

  useEffect(() => {
    const fetchDataEpisode = async () => {
      try {
        const res = await episodes_service.getById(Number(episodeId));
        setEpisode(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataEpisode();
  }, [id, episodeId, anime, name]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await episodes_service.getByAnimeId(Number(id));
        setEpisodeList(res);

        const index = res.findIndex((episode: EpisodesGet) => episode.id === Number(episodeId));
        setCurrentEpisodeIndex(index !== -1 ? index : 0);

        if (index !== -1) {
          setEpisode(res[index]);
        } else {
          setEpisode(res[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const goToNextEpisode = () => {
    const nextIndex = currentEpisodeIndex + 1;
    if (nextIndex < episodeList.length) {
      const nextEpisode = episodeList[nextIndex];
      setEpisode(nextEpisode);
      router.push(
        `/episodio/${nextEpisode.name}/${nextEpisode.id}/${anime}/${id}?index=${nextIndex}`,
        undefined,
        { shallow: true },
      );
      setCurrentEpisodeIndex(nextIndex);
    }
  };

  const goToPreviousEpisode = () => {
    const previousIndex = currentEpisodeIndex - 1;
    if (previousIndex >= 0) {
      const previousEpisode = episodeList[previousIndex];
      setEpisode(previousEpisode);
      router.push(
        `/episodio/${previousEpisode.name}/${previousEpisode.id}/${anime}/${id}?index=${previousIndex}`,
        undefined,
        { shallow: true },
      );
      setCurrentEpisodeIndex(previousIndex);
    }
  };

  const handleEpisodeClick = (selectedEpisode: EpisodesGet, index: number) => {
    setEpisode(selectedEpisode);
    setCurrentEpisodeIndex(index);
    router.push(
      `/episodio/${selectedEpisode.name}/${selectedEpisode.id}/${anime}/${id}`,
      undefined,
      { shallow: true },
    );
  };

  return (
    <>
      <Head>
        <title>Neko Animes - {anime}</title>
      </Head>
      <main>
        <div className={styles.container}>
          <div className={styles.container_title}>
            {anime} {name}
          </div>
          <div className={styles.container_video}>
            <div className={styles.video}>
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
            <div className={styles.container_next_previous}>
              <div className={styles.container_btn}>
                <Image src={Arrow} alt="Flecha voltar episódio" className={styles.arrow_left} />
                <ButtonComponent
                  value={'Episódio Anterior'}
                  className={styles.btn}
                  onClick={goToPreviousEpisode}
                  disabled={currentEpisodeIndex === 0}
                />
              </div>
              <div className={styles.bar}></div>
              <div className={styles.container_btn}>
                <ButtonComponent
                  value={'Próximo Episódio'}
                  className={styles.btn}
                  onClick={goToNextEpisode}
                  disabled={currentEpisodeIndex === episodeList.length - 1}
                />
                <Image src={Arrow} alt="Flecha próximo episódio" className={styles.arrow_right} />
              </div>
            </div>
          </div>
          <SeasonsList id={Number(id)} handleEpisodeClick={handleEpisodeClick} />
        </div>
      </main>
    </>
  );
};

export default EpisodePage;
