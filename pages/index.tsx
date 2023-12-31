import Head from 'next/head';
import Classifications from '../components/slides/slidesClassifications';
import SlidesAnimes from '../components/slides/slidesAnimes';
import SlidesAnimesFeatures from '../components/slides/slidesAnimesFeatures';
import SlidesAnimesPopular from '../components/slides/slidesAnimesPopular';
import SlidesBackgrounds from '../components/slides/slidesBackgrounds';
import SlidesAnimesNewest from '../components/slides/slidesAnimesNewest';
import SlidesAnimesFavorites from '../components/slides/slidesFavorites';

const HomePagePublic = () => {
  return (
    <>
      <Head>
        <title>Neko Animes</title>
      </Head>
      <SlidesBackgrounds />
      <main>
        <SlidesAnimesFavorites color="#02ff9e" />
        <SlidesAnimesFeatures color="#ff0278" />
        <SlidesAnimesNewest color="#02a2ff" />
        <SlidesAnimes color="#ffd000" />
        <SlidesAnimesPopular color="#0aff02" />
        <Classifications color="#ff7c02" />
      </main>
    </>
  );
};
export default HomePagePublic;
