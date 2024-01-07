import styles from './styles.module.scss';
import Image from 'next/image';
import Arrow from '@/public/assets/arrowBtn.png';
import animes_services, { AnimesGet } from '../../../services/animes/animes.service';
import { EpisodesGet } from '../../../services/episodes/episodes.service';
import { useEffect, useState } from 'react';

interface SeasonsListProps {
  id: number;
  handleEpisodeClick: (selectedEpisode: EpisodesGet, index: number) => void;
}

const SeasonsList: React.FC<SeasonsListProps> = ({ handleEpisodeClick, id }) => {
  const [data, setData] = useState<AnimesGet>();
  const [seasonVisibility, setSeasonVisibility] = useState<boolean[]>([]);

  const toggleSeasonVisibility = (index: number) => {
    setSeasonVisibility((prevVisibility) =>
      prevVisibility.map((visibility, i) => (i === index ? !visibility : visibility)),
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await animes_services.getById(Number(id));
        setData(res);

        if (res && res.seasons && res.seasons.length > 0) {
          const initialVisibility = new Array(res.seasons.length).fill(false);
          initialVisibility[0] = true;
          setSeasonVisibility(initialVisibility);
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <div className={styles.container_content_seasons}>
      {data?.seasons.map((season, index) => (
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
              {season.episodes.map((episode, idx) => (
                <div key={idx}>
                  <div className={styles.episodes} onClick={() => handleEpisodeClick(episode, idx)}>
                    {episode.name}
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
          )}
        </div>
      ))}
    </div>
  );
};

export default SeasonsList;
