import styles from '../../styles.module.scss';
import Swal from 'sweetalert2';
import ButtonComponent from '../../../../common/button';
import InputComponent from '../../../../common/input';
import LabelComponent from '../../../../common/label';
import { FormEvent, useState } from 'react';
import { Form, FormGroup } from 'reactstrap';
import episodes_service, {
  EpisodesCreate,
} from '../../../../../services/episodes/episodes.service';

const EpisodesUpdate = () => {
  const [episodes, setEpisodes] = useState<EpisodesCreate>({
    id: '',
    name: '',
    url: '',
    episodeOrder: 0,
    seasonId: 0,
  });

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await episodes_service.update(Number(episodes.id), {
        name: episodes.name,
        url: episodes.url,
        episodeOrder: episodes.episodeOrder,
        seasonId: episodes.seasonId,
      });

      setEpisodes({ name: '', url: '', episodeOrder: 0, seasonId: 0 });

      Swal.fire('Sucesso!', 'Episódio atualizado com sucesso!', 'success');
    } catch (error: any) {
      Swal.fire('Erro!', `${error.message}`, 'error');
    }
  };

  return (
    <Form className={styles.form} onSubmit={handleUpdate}>
      <FormGroup className={styles.form_group}>
        <div className={styles.form_group_flex}>
          <div className={styles.form_group_flex_d}>
            <LabelComponent htmlFor="name" value={'Nome do episódio'} />
            <InputComponent
              placeholder="Exemplo: Piloto"
              id="name"
              name="name"
              onChange={(e) => setEpisodes({ ...episodes, name: e.target.value })}
            />
          </div>
          <div className={styles.form_group_flex_id}>
            <LabelComponent htmlFor="id" value={'ID do episódio'} />
            <InputComponent
              placeholder="Exemplo: 2"
              id="id"
              name="id"
              onChange={(e) => setEpisodes({ ...episodes, id: parseInt(e.target.value) })}
            />
          </div>
        </div>
      </FormGroup>
      <FormGroup className={styles.form_group}>
        <LabelComponent htmlFor="url" value={'Video URL'} />
        <InputComponent
          placeholder="Exemplo: https://www.youtube.com/watch?v=44wn0Huz6DA&list=RDMM&start_radio=1&rv=jbck-AJNxGc"
          id="url"
          name="url"
          onChange={(e) => setEpisodes({ ...episodes, url: e.target.value })}
        />
      </FormGroup>
      <FormGroup className={styles.form_group}>
        <div className={styles.form_group_flex}>
          <div className={styles.form_group_flex_d}>
            <LabelComponent htmlFor="episodeOrder" value={'Ordem'} />
            <InputComponent
              placeholder="Exemplo: 2"
              id="episodeOrder"
              name="episodeOrder"
              onChange={(e) => setEpisodes({ ...episodes, episodeOrder: parseInt(e.target.value) })}
            />
          </div>
          <div className={styles.form_group_flex_d}>
            <LabelComponent htmlFor="seasonId" value={'ID da temporada'} />
            <InputComponent
              placeholder="Exemplo: 2"
              id="seasonId"
              name="seasonId"
              onChange={(e) => setEpisodes({ ...episodes, seasonId: parseInt(e.target.value) })}
            />
          </div>
        </div>
      </FormGroup>
      <ButtonComponent value="Atualizar episódio" className={styles.btn} />
    </Form>
  );
};

export default EpisodesUpdate;
