import styles from '../../styles.module.scss';
import { FormEvent, useState } from 'react';
import { Form, FormGroup } from 'reactstrap';
import seasons_service, { Seasons } from '../../../../../services/seasons/seasons.service';
import ButtonComponent from '../../../../common/button';
import InputComponent from '../../../../common/input';
import LabelComponent from '../../../../common/label';

const SeasonsUpdate = () => {
  const [seasons, setSeasons] = useState<Seasons>({
    id: '',
    name: '',
    animeId: 0,
    order: 0,
  });

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await seasons_service.update(Number(seasons.id), {
        name: seasons.name,
        order: seasons.order,
        animeId: seasons.animeId,
      });

      setSeasons({ name: '', animeId: 0, order: 0 });

      alert('Temporada atualizada');
    } catch (error) {
      console.error('Erro ao atualizar temporada:', error);
    }
  };

  return (
    <Form className={styles.form} onSubmit={handleUpdate}>
      <FormGroup className={styles.form_group}>
        <div className={styles.form_group_flex}>
          <div className={styles.form_group_flex_d}>
            <LabelComponent value={'Nome da temporada'} />
            <InputComponent onChange={(e) => setSeasons({ ...seasons, name: e.target.value })} />
          </div>
          <div className={styles.form_group_flex_id}>
            <LabelComponent value={'ID da temporada'} />
            <InputComponent
              onChange={(e) => setSeasons({ ...seasons, id: parseInt(e.target.value) })}
            />
          </div>
        </div>
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
      <ButtonComponent value="Atualizar temporada" className={styles.btn} />
    </Form>
  );
};

export default SeasonsUpdate;
