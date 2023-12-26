import styles from '../../styles.module.scss';
import { FormEvent, useState } from 'react';
import { Form, FormGroup } from 'reactstrap';
import LabelComponent from '../../../../common/label';
import InputComponent from '../../../../common/input';
import ButtonComponent from '../../../../common/button';
import seasons_service, { Seasons } from '../../../../../services/seasons/seasons.service';

const SeasonsCreate = () => {
  const [seasons, setSeasons] = useState<Seasons>({
    name: '',
    animeId: 0,
    order: 0,
  });

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();

      const res = await seasons_service.create(seasons);
      setSeasons({ name: '', animeId: 0, order: 0 });

      alert('Temporada criada com sucesso!' + JSON.stringify(res));
    } catch (error: any) {
      alert('Erro ao criar a temporada: ' + error.message);
    }
  };

  return (
    <Form className={styles.form} onSubmit={handleSubmit}>
      <FormGroup className={styles.form_group}>
        <LabelComponent value={'Nome da Temporada'} />
        <InputComponent onChange={(e) => setSeasons({ ...seasons, name: e.target.value })} />
      </FormGroup>
      <FormGroup className={styles.form_group}>
        <div className={styles.form_group_flex}>
          <div className={styles.form_group_flex_d}>
            <LabelComponent value={'Ordem'} />
            <InputComponent
              onChange={(e) => setSeasons({ ...seasons, order: parseInt(e.target.value) })}
            />
          </div>
          <div className={styles.form_group_flex_d}>
            <LabelComponent value={'ID do anime'} />
            <InputComponent
              onChange={(e) => setSeasons({ ...seasons, animeId: parseInt(e.target.value) })}
            />
          </div>
        </div>
      </FormGroup>
      <ButtonComponent value="Criar temporada" className={styles.btn} />
    </Form>
  );
};

export default SeasonsCreate;
