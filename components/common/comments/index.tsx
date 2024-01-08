import styles from './styles.module.scss';
import Image from 'next/image';
import Cat from '@/public/assets/footer-cat.png';
import Profile from '@/public/assets/cat_profile.png';
import Like from '@/public/assets/like.png';
import ButtonComponent from '../button';

const Comments = () => {
  return (
    <div className={styles.container}>
      <div className={styles.container_content}>
        <Image src={Cat} alt="Neko Animes" className={styles.img} />
        <div className={styles.container_create_comment}>
          <div className={styles.container_content_create_comment}>
            <div className={styles.container_profile}>
              <Image src={Profile} alt="Neko Animes" className={styles.profile} />
            </div>
            <div className={styles.container_comment}>
              <p className={styles.comment}>Comentar como Neko Animes</p>
              <textarea className={styles.textarea} placeholder="Deixe um comentário..."></textarea>
              <div className={styles.container_btn}>
                <ButtonComponent value={'Comentar'} className={styles.btn} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container_count_comments}>
          <p>1 Comentário</p>
        </div>
        <div className={styles.container_all_comments}>
          <div className={styles.container_profile}>
            <div className={styles.profile}>
              <Image src={Profile} alt="Neko Animes" />
            </div>
            <p className={styles.username}>Neko Animes</p>
          </div>
          <div className={styles.container_comment}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt deserunt doloremque
              rem ipsum aliquid mollitia ex exercitationem consectetur illum, delectus harum.
              Eligendi labore sequi obcaecati eius perspiciatis delectus temporibus esse.
            </p>
            <div className={styles.container_like}>
              <div className={styles.container_content_like}>
                <Image src={Like} alt="Curtir comentário" className={styles.like} />
                <p>0</p>
              </div>
              <p>03/12/98,10:50:40</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
