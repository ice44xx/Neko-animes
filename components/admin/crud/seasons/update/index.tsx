import styles from '../../styles.module.scss';
import Swal from 'sweetalert2';
import ButtonComponent from '../../../../common/button';
import InputComponent from '../../../../common/input';
import LabelComponent from '../../../../common/label';
import { FormEvent, useState } from 'react';
import { Form, FormGroup } from 'reactstrap';
import seasons_service, { SeasonsCreate } from '../../../../../services/seasons/seasons.service';

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

      Swal.fire('Sucesso!', 'Temporada atualizada com sucesso!', 'success');
    } catch (error: any) {
      Swal.fire('Erro!', `${error.message}`, 'error');
    }
  };

  return (
    <Form className={styles.form} onSubmit={handleUpdate}>
      <FormGroup className={styles.form_group}>
        <div className={styles.form_group_flex}>
          <div className={styles.form_group_flex_d}>
            <LabelComponent htmlFor="name" value={'Nome da temporada'} />
            <InputComponent
              placeholder="Exemplo: Temporada 1 jujutsu no kaisen"
              id="name"
              name="name"
              onChange={(e) => setSeasons({ ...seasons, name: e.target.value })}
            />
          </div>
          <div className={styles.form_group_flex_id}>
            <LabelComponent htmlFor="id" value={'ID da temporada'} />
            <InputComponent
              placeholder="Exemplo: 2"
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
              placeholder="Exemplo: 2"
              id="order"
              name="order"
              onChange={(e) => setSeasons({ ...seasons, order: parseInt(e.target.value) })}
            />
          </div>
          <div className={styles.form_group_flex_d}>
            <LabelComponent htmlFor="animeId" value={'ID do anime'} />
            <InputComponent
              placeholder="Exemplo: 2"
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
