import styles from '../../styles.module.scss';
import { FormEvent, useState } from 'react';
import { Form, FormGroup } from 'reactstrap';
import seasons_service, { SeasonsCreate } from '../../../../../services/seasons/seasons.service';
import ButtonComponent from '../../../../common/button';
import InputComponent from '../../../../common/input';
import LabelComponent from '../../../../common/label';

const SeasonsUpdate = () => {
  const [seasons, setSeasons] = useState<SeasonsCreate>({
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
            <LabelComponent htmlFor="name" value={'Nome da temporada'} />
            <InputComponent
              id="name"
              name="name"
              onChange={(e) => setSeasons({ ...seasons, name: e.target.value })}
            />
          </div>
          <div className={styles.form_group_flex_id}>
            <LabelComponent htmlFor="id" value={'ID da temporada'} />
            <InputComponent
              id="id"
              name="id"
              onChange={(e) => setSeasons({ ...seasons, id: parseInt(e.target.value) })}
            />
          </div>
        </div>
      </FormGroup>
      <FormGroup className={styles.form_group}>
        <div className={styles.form_group_flex}>
          <div className={styles.form_group_flex_d}>
            <LabelComponent htmlFor="order" value={'Ordem'} />
            <InputComponent
              id="order"
              name="order"
              onChange={(e) => setSeasons({ ...seasons, order: parseInt(e.target.value) })}
            />
          </div>
          <div className={styles.form_group_flex_d}>
            <LabelComponent htmlFor="animeId" value={'ID do anime'} />
            <InputComponent
              id="animeId"
              name="animeId"
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
