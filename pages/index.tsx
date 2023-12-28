import Head from 'next/head';
import Classifications from '../components/classifications';
import SlidesAnimes from '../components/slides/slidesAnimes';
import SlidesAnimesFeatures from '../components/slides/slidesAnimesFeatures';
import SlidesAnimesHype from '../components/slides/slidesAnimesHype';
import SlidesAnimesNewest from '../components/slides/slidesAnimesNewest';

const HomePagePublic = () => {
  return (
    <>
      <Head>
        <title>Neko Animes</title>
      </Head>
      <main>
        <SlidesAnimesFeatures color="yellow" />
        <SlidesAnimesNewest color="green" />
        <SlidesAnimes color="red" />
        <SlidesAnimesHype color="blue" />
        <Classifications color="red" />
      </main>
    </>
  );
};
export default HomePagePublic;
