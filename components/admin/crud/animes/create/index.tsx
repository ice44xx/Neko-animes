import styles from '../../styles.module.scss';
import { Form, FormGroup } from 'reactstrap';
import InputComponent from '../../../../common/inputs';
import LabelComponent from '../../../../common/label';
import ButtonComponent from '../../../../common/button';
import { useState } from 'react';

const AnimesCreate = () => {
  const [] = useState();
  return (
    <Form className={styles.form}>
      <FormGroup className={styles.form_group}>
        <LabelComponent value={'Nome do anime'} />
        <InputComponent />
      </FormGroup>
      <FormGroup className={styles.form_group}>
        <LabelComponent value={'Thumbnail'} />
        <InputComponent />
      </FormGroup>
      <FormGroup className={styles.form_group}>
        <LabelComponent value={'Em destaque ?'} />
        <InputComponent />
      </FormGroup>
      <FormGroup className={styles.form_group}>
        <LabelComponent value={'Classificação'} />
        <InputComponent />
      </FormGroup>
      <FormGroup className={styles.form_group}>
        <LabelComponent value={'Categorias'} />
        <InputComponent />
      </FormGroup>
      <ButtonComponent value="Lançar anime" className={styles.btn} />
    </Form>
  );
};

export default AnimesCreate;
