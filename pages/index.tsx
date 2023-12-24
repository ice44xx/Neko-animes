import Head from 'next/head';
import SlidesAnimes from '../components/slides/slidesAnimes';

const HomePagePublic = () => {
  return (
    <>
      <Head>
        <title>Neko Animes</title>
      </Head>
      <main>
        <SlidesAnimes />
      </main>
    </>
  );
};
export default HomePagePublic;
