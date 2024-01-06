import styles from '../styles.module.scss';
import LabelComponent from '../../../common/label';
import InputComponent from '../../../common/input';
import ButtonComponent from '../../../common/button';
import { Form, FormGroup } from 'reactstrap';

const UserData = () => {
  return (
    <Form className={styles.form}>
      <FormGroup className={styles.form_group}>
        <LabelComponent value={'Nickname'} className={styles.label} />
        <InputComponent type="text" className={styles.input} />
      </FormGroup>
      <FormGroup className={styles.form_group}>
        <LabelComponent value={'E-mail'} className={styles.label} />
        <InputComponent type="text" className={styles.input} />
      </FormGroup>
      <FormGroup className={styles.form_group}>
        <LabelComponent value={'Data de Aniversário'} className={styles.label} />
        <InputComponent type="date" className={styles.input} />
      </FormGroup>
      <ButtonComponent value={'Salvar alterações'} className={styles.btn} />
    </Form>
  );
};

export default UserData;
