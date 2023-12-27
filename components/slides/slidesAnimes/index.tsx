import SplideCarousel from '../../common/carousel';
import styles from './styles.module.scss';

const images = [
  'https://res.cloudinary.com/doupbxhfd/image/upload/v1690580161/Thumbnails/Tenchi_Muyou_GXP_Paradise_Shidou-hen_rh3blh.webp',
  'https://res.cloudinary.com/doupbxhfd/image/upload/v1690580161/Thumbnails/Naruto_clasico_hubjkd.webp',
  'https://res.cloudinary.com/doupbxhfd/image/upload/v1690580161/Thumbnails/Yakusoku_no_Neverlen_kljwd8.webp',
  'https://res.cloudinary.com/doupbxhfd/image/upload/v1690133090/Thumbnails/KonoSuba_erzgrt_ubbfcj.webp',
  'https://res.cloudinary.com/doupbxhfd/image/upload/v1690132964/Thumbnails/Bang_Dream_It_s_MyGo_zbgddj_fpsuko.webp',
  'https://res.cloudinary.com/doupbxhfd/image/upload/v1690133089/Thumbnails/Dr._Stone_c5ljk4_rgc0yc.webp',
  'https://res.cloudinary.com/doupbxhfd/image/upload/v1690133089/Thumbnails/EdensZero_ffu34i_bqwbk9.webp',
  'https://res.cloudinary.com/doupbxhfd/image/upload/v1690133089/Thumbnails/EdensZero_ffu34i_bqwbk9.webp',
  'https://res.cloudinary.com/doupbxhfd/image/upload/v1690133089/Thumbnails/EdensZero_ffu34i_bqwbk9.webp',
];

const SlidesAnimes = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Animes Lançamentos</p>
      <SplideCarousel images={images} />
    </div>
  );
};

export default SlidesAnimes;