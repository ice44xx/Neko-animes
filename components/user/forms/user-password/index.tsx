import styles from '../styles.module.scss';
import LabelComponent from '../../../common/label';
import InputComponent from '../../../common/input';
import ButtonComponent from '../../../common/button';
import users_service, { UserPassword } from '../../../../services/users/users.service';
import { Form, FormGroup } from 'reactstrap';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';

const UserPassword = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserPassword>({
    password: '',
    newPassword: '',
  });
  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();

      await users_service.updatePassword(user);
      alert('Senha alterada');
      router.push('/');
      sessionStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form className={styles.form} onSubmit={handleSubmit}>
      <FormGroup className={styles.form_group}>
        <InputComponent
          type="password"
          id="currentPassword"
          name="currentPassword"
          placeholder=""
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className={styles.input}
        />
        <LabelComponent value={'Senha atual'} htmlFor="currentPassword" className={styles.label} />
      </FormGroup>
      <FormGroup className={styles.form_group}>
        <InputComponent
          type="password"
          id="newPassword"
          name="newPassword"
          placeholder=""
          onChange={(e) => setUser({ ...user, newPassword: e.target.value })}
          className={styles.input}
        />
        <LabelComponent value={'Nova senha'} htmlFor="newPassword" className={styles.label} />
      </FormGroup>
      <ButtonComponent value={'Salvar alterações'} className={styles.btn} />
    </Form>
  );
};

export default UserPassword;
