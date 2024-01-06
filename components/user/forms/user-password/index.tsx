import styles from '../styles.module.scss';
import LabelComponent from '../../../common/label';
import InputComponent from '../../../common/input';
import ButtonComponent from '../../../common/button';
import { Form, FormGroup } from 'reactstrap';

const UserPassword = () => {
  return (
    <Form className={styles.form}>
      <FormGroup className={styles.form_group}>
        <LabelComponent value={'Senha antiga'} className={styles.label} />
        <InputComponent
          type="password"
          placeholder="Digite sua senha antiga"
          className={styles.input}
        />
      </FormGroup>
      <FormGroup className={styles.form_group}>
        <LabelComponent value={'Nova senha'} className={styles.label} />
        <InputComponent
          type="password"
          placeholder="Digite sua nova senha"
          className={styles.input}
        />
      </FormGroup>
      <ButtonComponent value={'Salvar alterações'} className={styles.btn} />
    </Form>
  );
};

export default UserPassword;
