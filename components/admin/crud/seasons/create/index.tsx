import styles from '../../styles.module.scss';
import { FormEvent, useState } from 'react';
import { Form, FormGroup } from 'reactstrap';
import LabelComponent from '../../../../common/label';
import InputComponent from '../../../../common/inputs';
import ButtonComponent from '../../../../common/button';

const SeasonsCreate = () => {
  const [name, setName] = useState('');
  const [order, setOrder] = useState();
  const [animeId, SetAnimeId] = useState();

  const handleSubmit = (e: FormEvent) => {
    try {
      e.preventDefault();
    } catch (error) {}
  };

  return (
    <Form className={styles.form}>
      <FormGroup className={styles.form_group}>
        <LabelComponent value={'Nome da Temporada'} />
        <InputComponent />
      </FormGroup>
      <FormGroup className={styles.form_group}>
        <div className={styles.form_group_flex}>
          <div className={styles.form_group_flex_id}>
            <LabelComponent value={'Ordem'} />
            <InputComponent />
          </div>
          <div className={styles.form_group_flex_id}>
            <LabelComponent value={'ID do anime'} />
            <InputComponent />
          </div>
        </div>
      </FormGroup>
      <ButtonComponent value="Criar temporada" className={styles.btn} />
    </Form>
  );
};

export default SeasonsCreate;
