import styles from './styles.module.scss';
import Head from 'next/head';
import Arrow from '@/public/assets/arrowBtn.png';
import ButtonComponent from '../../../../../components/common/button';
import Image from 'next/image';
import SeasonsList from '../../../../../components/common/seasons';
import Comments from '../../../../../components/common/comments';
import useLocalStorage from '../../../../../components/hooks/use-local-storage';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import episodes_service, { EpisodesGet } from '../../../../../services/episodes/episodes.service';

const EpisodePage = () => {
  const router = useRouter();
  const { id, episodeId, anime, name } = router.query;
  const [episodeList, setEpisodeList] = useLocalStorage('episodeList', []);
  const [selectedEpisode, setSelectedEpisode] = useLocalStorage('selectedEpisode', null);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useLocalStorage('currentEpisodeIndex', 0);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [episode, setEpisode] = useState<EpisodesGet>();

  useEffect(() => {
    const fetchDataEpisode = async () => {
      try {
        const res = await episodes_service.getById(Number(episodeId));
        setEpisode(res);
      } catch (error) {
        console.log(error);
      }
    };
    if (id && episodeId && anime && name) {
      fetchDataEpisode();
    }
  }, [id, episodeId, anime, name]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await episodes_service.getByAnimeId(Number(id));
        setEpisodeList(res);

        const index = res.findIndex((episode: EpisodesGet) => episode.id === Number(episodeId));
        const currentEpisodeIdx = index !== -1 ? index : 0;
        setCurrentEpisodeIndex(currentEpisodeIdx);

        const selected = index !== -1 ? res[index] : res[0];
        setSelectedEpisode(selected);
        setButtonDisabled(currentEpisodeIndex === 0);
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      fetchData();
    }
  }, [currentEpisodeIndex]);

  const goToNextEpisode = () => {
    const nextIndex = Number(currentEpisodeIndex) + 1;

    if (nextIndex < episodeList.length) {
      const nextEpisode: any = episodeList[nextIndex];
      if (nextEpisode) {
        setSelectedEpisode(nextEpisode);
        setCurrentEpisodeIndex(nextIndex);

        router.push(
          `/episodio/${nextEpisode.name}/${nextEpisode.id}/${anime}/${id}?index=${nextIndex}`,
          undefined,
          { shallow: true },
        );
      }
    }
  };

  const goToPreviousEpisode = () => {
    const previousIndex = Number(currentEpisodeIndex) - 1;

    if (previousIndex >= 0) {
      const previousEpisode: any = episodeList[previousIndex];
      if (previousEpisode) {
        setSelectedEpisode(previousEpisode);
        setCurrentEpisodeIndex(previousIndex);

        router.push(
          `/episodio/${previousEpisode.name}/${previousEpisode.id}/${anime}/${id}?index=${previousIndex}`,
          undefined,
          { shallow: true },
        );
      }
    }
  };

  const handleEpisodeClick = (selectedEpisode: any, index: number) => {
    if (selectedEpisode) {
      setSelectedEpisode(selectedEpisode);
      setCurrentEpisodeIndex(index);

      router.push(
        `/episodio/${selectedEpisode.name}/${selectedEpisode.id}/${anime}/${id}`,
        undefined,
        { shallow: true },
      );
    }
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
                  disabled={buttonDisabled}
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
          <Comments />
        </div>
      </main>
    </>
  );
};

export default EpisodePage;
