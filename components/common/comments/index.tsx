import styles from './styles.module.scss';
import Image from 'next/image';
import Cat from '@/public/assets/footer-cat.png';
import Profile from '@/public/assets/cat_profile.png';
import Like from '@/public/assets/like.png';
import LikeConfirmed from '@/public/assets/heart.png';
import Trash from '@/public/assets/trash.png';
import ButtonComponent from '../button';
import comments_service, { CommentsGet } from '../../../services/comments/comments.service';
import { FormEvent, useEffect, useState } from 'react';
import { Form } from 'reactstrap';
import { useRouter } from 'next/router';
import likes_comments_services, {
  GetLikes,
  LikesComment,
} from '../../../services/likes/likes-coments-service';
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInYears,
} from 'date-fns';

const Comments = () => {
  const router = useRouter();
  const { episodeId } = router.query;
  const [loggin, setLoggin] = useState(null);
  const [likes, setLikes] = useState<GetLikes[]>([]);
  const [data, setData] = useState<CommentsGet[]>([]);
  const [comment, setComment] = useState({
    text: '',
    episodeId: episodeId ? Number(episodeId) : 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem('userInfo');
      if (token) {
        const tokenData = JSON.parse(token);
        setLoggin(tokenData.id);
      }
      try {
        if (episodeId) {
          const res = await comments_service.findCommentsByEpisode(Number(episodeId));
          setData(res);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchLike = async () => {
      try {
        const res = await likes_comments_services.get();
        setLikes(res);
      } catch (error) {
        console.log(error);
      }
    };

    if (episodeId) {
      setComment((prevState) => ({ ...prevState, episodeId: Number(episodeId) }));
      fetchData();
    }
    fetchLike();
  }, [episodeId]);

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      await comments_service.create(comment);
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await comments_service.delete(id);
      alert('Comentário deletado');
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (commentId: number) => {
    try {
      const likedCommentIndex = likes.findIndex(
        (comment: LikesComment) => comment.commentId === commentId,
      );

      if (likedCommentIndex !== -1 && likes[likedCommentIndex].like) {
        await likes_comments_services.delete(commentId);
      } else {
        await likes_comments_services.create(commentId);
      }

      const updatedComments = await comments_service.findCommentsByEpisode(Number(episodeId));
      setData(updatedComments);

      const updatedLikesFromServer = await likes_comments_services.get();
      setLikes(updatedLikesFromServer);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDistanceToNowInPortuguese = (date: Date) => {
    const now = new Date();

    const diffDays = differenceInDays(now, date);
    const diffHours = differenceInHours(now, date);
    const diffMinutes = differenceInMinutes(now, date);
    const diffYears = differenceInYears(now, date);

    if (diffYears > 0) {
      return `${diffYears} ${diffYears === 1 ? 'ano' : 'anos'} atrás`;
    } else if (diffDays > 0) {
      return `${diffDays} ${diffDays === 1 ? 'dia' : 'dias'} atrás`;
    } else if (diffHours > 0) {
      return `${diffHours} ${diffHours === 1 ? 'hora' : 'horas'} atrás`;
    } else {
      return `${diffMinutes} ${diffMinutes === 1 ? 'minuto' : 'minutos'} atrás`;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_content}>
        <Image src={Cat} alt="Neko Animes" className={styles.img} />
        <div className={styles.container_create_comment}>
          <div className={styles.container_content_create_comment}>
            {loggin ? (
              <>
                <div className={styles.container_profile}>
                  <Image src={Profile} alt="Neko Animes" className={styles.profile} />
                </div>
                <div className={styles.container_comment}>
                  <p className={styles.comment}>Comentar como Neko Animes</p>
                  <Form onSubmit={handleSubmit}>
                    <textarea
                      className={styles.textarea}
                      placeholder="Deixe um comentário..."
                      onChange={(e) =>
                        setComment((prevState) => ({ ...prevState, text: e.target.value }))
                      }
                    />
                    <div className={styles.container_btn}>
                      <ButtonComponent value={'Comentar'} className={styles.btn} />
                    </div>
                  </Form>
                </div>
              </>
            ) : (
              <p>Ops login amigao</p>
            )}
          </div>
        </div>
        <div className={styles.container_count_comments}>
          {data.length === 0 ? <p>{data.length} Comentário</p> : <p>{data.length} Comentários</p>}
        </div>
        {data.map((comment, index) => (
          <div key={index} className={styles.container_all_comments}>
            <div className={styles.container_profile}>
              {comment.users.profile ? (
                <>
                  <div className={styles.profile}>
                    <Image
                      src={comment.users.profile}
                      width={70}
                      height={70}
                      alt={comment.users.userName}
                    />
                  </div>
                </>
              ) : (
                <div className={styles.profile}>
                  <Image src={Profile} alt="Neko Animes" />
                </div>
              )}
              <p className={styles.username}>{comment.users.userName}</p>
              {loggin === comment.users.id && (
                <Image
                  onClick={() => handleDelete(comment.id)}
                  src={Trash}
                  alt="Deletar comentário"
                  className={styles.trash}
                />
              )}
            </div>
            <div className={styles.container_comment}>
              <p>{comment.text}</p>
              <div className={styles.container_like}>
                <div className={styles.container_content_like}>
                  {loggin ? (
                    <Image
                      onClick={() => handleLike(comment.id)}
                      src={
                        likes.find((like: LikesComment) => like.commentId === comment.id)?.like
                          ? LikeConfirmed
                          : Like
                      }
                      alt={
                        likes.find((like: LikesComment) => like.commentId === comment.id)?.like
                          ? 'Descurtir comentário'
                          : 'Curtir comentário'
                      }
                      className={styles.like}
                    />
                  ) : (
                    <Image src={Like} alt={'Curtir comentário'} className={styles.like} />
                  )}
                  <p className={styles.like_count}>{comment.likes}</p>
                </div>
                <p>{formatDistanceToNowInPortuguese(new Date(comment.createdAt))}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
