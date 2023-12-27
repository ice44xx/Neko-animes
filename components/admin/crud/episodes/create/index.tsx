import styles from '../../styles.module.scss';
import { FormEvent, useState } from 'react';
import { Form, FormGroup } from 'reactstrap';
import episodes_service, {
  EpisodesCreate,
} from '../../../../../services/episodes/episodes.service';
import LabelComponent from '../../../../common/label';
import InputComponent from '../../../../common/input';
import ButtonComponent from '../../../../common/button';

const EpisodesCreate = () => {
  const [episodes, setEpisodes] = useState<EpisodesCreate>({
    name: '',
    url: '',
    episodeOrder: 0,
    seasonId: 0,
  });

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const res = await episodes_service.create(episodes);
      setEpisodes({ name: '', url: '', episodeOrder: 0, seasonId: 0 });

      alert('Episódio criado com sucesso!' + JSON.stringify(res));
    } catch (error: any) {
      alert('Erro ao criar episódio: ' + error.message);
    }
  };

  return (
    <Form className={styles.form} onSubmit={handleSubmit}>
      <FormGroup className={styles.form_group}>
        <LabelComponent htmlFor="name" value={'Nome do episódio'} />
        <InputComponent
          id="name"
          name="name"
          onChange={(e) => setEpisodes({ ...episodes, name: e.target.value })}
        />
      </FormGroup>
      <FormGroup className={styles.form_group}>
        <LabelComponent htmlFor="url" value={'Video URL'} />
        <InputComponent
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
              id="episodeOrder"
              name="episodeOrder"
              onChange={(e) => setEpisodes({ ...episodes, episodeOrder: parseInt(e.target.value) })}
            />
          </div>
          <div className={styles.form_group_flex_d}>
            <LabelComponent htmlFor="seasonId" value={'Temporada Id'} />
            <InputComponent
              id="seasonId"
              name="seasonId"
              onChange={(e) => setEpisodes({ ...episodes, seasonId: parseInt(e.target.value) })}
            />
          </div>
        </div>
      </FormGroup>
      <ButtonComponent value="Criar episódio" className={styles.btn} />
    </Form>
  );
};

export default EpisodesCreate;
