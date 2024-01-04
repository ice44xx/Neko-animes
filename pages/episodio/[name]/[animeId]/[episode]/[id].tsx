import styles from './styles.module.scss';
import { useRouter } from 'next/router';

const EpisodePage = () => {
  const router = useRouter();
  const { animeId, episode, id, name } = router.query;

  return (
    <main>
      <h1>Detalhes do Episódio: {episode}</h1>
      <h1>ID do Episódio: {id}</h1>
      <h1>Detalhes do Anime: {name}</h1>
      <h1>ID do Anime: {animeId}</h1>
    </main>
  );
};

export default EpisodePage;
