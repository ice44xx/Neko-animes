import styles from '../../styles.module.scss';
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
        <LabelComponent htmlFor="name" value={'Nome da Temporada'} />
        <InputComponent
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
              id="order"
              name="order"
              onChange={(e) => setSeasons({ ...seasons, order: parseInt(e.target.value) })}
            />
          </div>
          <div className={styles.form_group_flex_d}>
            <LabelComponent htmlFor="id" value={'ID do anime'} />
            <InputComponent
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
