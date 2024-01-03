import Head from 'next/head';
import Classifications from '../components/slides/slidesClassifications';
import SlidesAnimes from '../components/slides/slidesAnimes';
import SlidesAnimesFeatures from '../components/slides/slidesAnimesFeatures';
import SlidesAnimesPopular from '../components/slides/slidesAnimesPopular';
import SlidesBackgrounds from '../components/slides/slidesBackgrounds';
import SlidesAnimesNewest from '../components/slides/slidesAnimesNewest';
import SlidesAnimesFavorites from '../components/slides/slidesFavorites';
import SlidesAnimesMovies from '../components/slides/slidesMovies';

const HomePagePublic = () => {
  return (
    <>
      <Head>
        <title>Neko Animes</title>
      </Head>
      <SlidesBackgrounds />
      <main>
        <SlidesAnimesFavorites color="#02ff9e" />
        <SlidesAnimesNewest color="#02a2ff" />
        <SlidesAnimesFeatures color="#ff3995" />
        <SlidesAnimes color="#ffd000" />
        <SlidesAnimesPopular color="#0aff02" />
        <SlidesAnimesMovies color="#e71515" />
        <Classifications color="#ff7c02" />
      </main>
    </>
  );
};
export default HomePagePublic;
