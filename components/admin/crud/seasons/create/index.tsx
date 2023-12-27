import styles from '../../styles.module.scss';
import Swal from 'sweetalert2';
import { FormEvent, useState } from 'react';
import { Form, FormGroup } from 'reactstrap';
import seasons_service, { SeasonsCreate } from '../../../../../services/seasons/seasons.service';
import LabelComponent from '../../../../common/label';
import InputComponent from '../../../../common/input';
import ButtonComponent from '../../../../common/button';

const SeasonsCreate = () => {
  const [seasons, setSeasons] = useState<SeasonsCreate>({
    name: '',
    animeId: 0,
    order: 0,
  });

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();

      await seasons_service.create(seasons);
      setSeasons({ name: '', animeId: 0, order: 0 });

      Swal.fire('Sucesso!', 'Temporada criada com sucesso!', 'success');
    } catch (error: any) {
      Swal.fire('Erro!', `${error.message}`, 'error');
    }
  };

  return (
    <Form className={styles.form} onSubmit={handleSubmit}>
      <FormGroup className={styles.form_group}>
        <LabelComponent htmlFor="name" value={'Nome da Temporada'} />
        <InputComponent
          placeholder="Exemplo: Temporada 1 jujutsu no kaisen"
          id="name"
          name="name"
          onChange={(e) => setSeasons({ ...seasons, name: e.target.value })}
        />
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
            <LabelComponent htmlFor="id" value={'ID do anime'} />
            <InputComponent
              placeholder="Exemplo: 2"
              id="id"
              name="id"
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
